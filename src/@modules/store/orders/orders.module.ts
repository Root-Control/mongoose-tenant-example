import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { Request, Response } from '@common/interfaces/express-extension';

import { DatabaseModule } from '@database';
import { OrdersController } from './orders.controller';
import { orderProviders } from './orders.providers';
import { OrdersService } from './orders.service';

import { OrderPermissions } from './schemas/order.schema';

@Module({
    imports: [DatabaseModule],
    controllers: [OrdersController],
    providers: [
        ...orderProviders,
        OrdersService
    ],
    exports: [
        ...orderProviders
    ]
})
export class OrdersModule implements NestModule {
    protected isGeneric: boolean = false;
    public configure(consumer: MiddlewareConsumer) {
        this.isGeneric = true;
        consumer
            .apply((req: Request, res: Response, next: Function) => {
                if (this.isGeneric) {
                    req.isGeneric = true;
                    req.genericPermissions = OrderPermissions;
                }
                next();
            }).forRoutes({ path: 'orders', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}