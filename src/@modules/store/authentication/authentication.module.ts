import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common';
import { authenticate } from 'passport';

import { authProviders } from './authentication.providers';

import { AuthenticationService } from './authentication.service';

import { AuthController } from './authentication.controller';

//  Middlewares
import { BodyValidatorMiddleware } from './middlewares/body-validator.middleware';
import { LoginValidatorMiddleware } from './middlewares/login-validator.middleware';


@Module({
    imports: [],
    providers: [
        ...authProviders,
        AuthenticationService
    ],
    controllers: [AuthController]
})
export class AuthenticationModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
                .apply(BodyValidatorMiddleware)
                .forRoutes('auth/local/signup');
        consumer
                .apply(LoginValidatorMiddleware, authenticate('local-signin', { session: false }))
                .forRoutes('auth/local/signin');

        consumer
                .apply(authenticate('facebook', { session: false }))
                .forRoutes('auth/facebook/token');

        consumer
                .apply(authenticate('twitter', { session: false }))
                .forRoutes('auth/twitter/token');

        consumer
                .apply(authenticate('google', { session: false }))
                .forRoutes('auth/google/token');
    }
}
