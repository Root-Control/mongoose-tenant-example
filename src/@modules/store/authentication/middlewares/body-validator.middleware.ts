import {
    BadRequestException,
    NestMiddleware,
    Injectable
} from '@nestjs/common';
//import { authUserSchema } from '../../users/joi/auth-user.joi';

@Injectable()
/**
 *  Body validator Middleware
 *  We validating if the Id provided is valid, and returning the found article in the variable req.article
 */
export class BodyValidatorMiddleware implements NestMiddleware {
    constructor() {
        console.log('Initializing Body Validator Middleware');
    }
    async use(req, res, next: Function) {
        console.log('HI, IM A MIDDLEWARE');
        //const result = authUserSchema.validate(req.body);

/*        if (result.error) {
            const errorMessage = result.error.details.shift().message;
            const message: string = errorMessage.replace(/["]/g, '');

            return next(new BadRequestException(`Validation failed: ${message}`));
        }*/
        next();
    }
}
