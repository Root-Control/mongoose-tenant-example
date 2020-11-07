import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from '@common/interfaces/express-extension';

import { green } from 'chalk';
import { Connection, connections } from 'mongoose';

import { DB_CONNECTION_TOKEN, ERROR_CODES, MESSAGES } from '../../server.constants';
import { getDatabaseFromOrigin } from '../helpers/utils';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(@Inject(DB_CONNECTION_TOKEN) private readonly connection: Connection) {
        console.log('Tenant Middleware initialized');    
    }
    async use(req: Request, res: Response, next: Function) {
        console.log(green('-----------TENANT MIDDLEWARE IS FIRED------------'));
        //  HARDCODED TENANT HERE
        //const database = getDatabaseFromOrigin(req.headers);
        const service = req.headers.service;
        const subdomain = getDatabaseFromOrigin(req.headers);

        console.log('subdomain');
        console.log(subdomain);
        console.log(`Origin: ${req.headers.origin}`)
        console.log(`Service: ${req.headers.service}`)
        
        if (!service) {
            return res.status(500).send({ message: MESSAGES.SERVICE_HEADER_MISSING, errorCode: ERROR_CODES.SERVICE_HEADER_MISSING });
        }

        req.connection = this.getConnection(subdomain, service);
        if (!req.connection) {
            return res.status(500).send({ message: MESSAGES.CONNECTION_NOT_FOUND, errorCode: ERROR_CODES.CONNECTION_NOT_FOUND })
        }

        next();
    }

    getConnection(subdomain, service) {
        console.log(`Search for -> ${service}`);
        console.log('Get connection called');
        console.log('Available connections');
        connections.forEach(connection => {
            console.log(connection.name);
        });
        let connectionBySubdomain,
            connectionByService;
        connectionBySubdomain = connections.find(connection => connection.name === subdomain);
        connectionByService = connections.find(connection => connection.name === service);

        return connectionBySubdomain || connectionByService;
    }
}
