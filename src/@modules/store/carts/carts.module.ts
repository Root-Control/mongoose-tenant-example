import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { Request, Response } from '@common/interfaces/express-extension';

import { DatabaseModule } from '@database';
import { CartsController } from './carts.controller';
import { cartProviders } from './carts.providers';
import { CartsService } from './carts.service';

import { CartPermissions } from './schemas/cart.schema';

@Module({
    imports: [DatabaseModule],
    controllers: [CartsController],
    providers: [
        ...cartProviders,
        CartsService
    ],
    exports: [
        ...cartProviders
    ]
})
export class CartsModule implements NestModule {
    protected isGeneric: boolean = false;
    public configure(consumer: MiddlewareConsumer) {
        this.isGeneric = true;
        consumer
            .apply((req: Request, res: Response, next: Function) => {
                if (this.isGeneric) {
                    req.isGeneric = true;
                    req.genericPermissions = CartPermissions;
                }
                next();
            }).forRoutes({ path: 'carts', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}