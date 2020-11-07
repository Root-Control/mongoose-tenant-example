import { Injectable, NestMiddleware } from '@nestjs/common';
import { white, blue } from 'chalk';
import { getMethodColor } from '../helpers/utils';
import { Request, Response } from '@common/interfaces/express-extension';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
    	console.log(blue('-----------LOGGER MIDDLEWARE IS FIRED------------'));
        let logMessage;
        const methodColor: any = getMethodColor(req.method);
        logMessage = `[URL]: ${req.baseUrl}`;
        const tenant = req['tenant'];
        console.log(`[${methodColor(req.method)}]-${white(req.baseUrl)} - Tenant: ${tenant}`);
        next();
    }
}
