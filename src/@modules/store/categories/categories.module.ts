import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { Request, Response } from '@common/interfaces/express-extension';

import { DatabaseModule } from '@database';
import { CategorysController } from './categories.controller';
import { categoryProviders } from './categories.providers';
import { CategorysService } from './categories.service';

import { CategoryPermissions } from './schemas/category.schema';

@Module({
    imports: [DatabaseModule],
    controllers: [CategorysController],
    providers: [
        ...categoryProviders,
        CategorysService
    ],
    exports: [
        ...categoryProviders
    ]
})
export class CategorysModule implements NestModule {
    protected isGeneric: boolean = false;
    public configure(consumer: MiddlewareConsumer) {
        this.isGeneric = true;
        consumer
            .apply((req: Request, res: Response, next: Function) => {
                if (this.isGeneric) {
                    req.isGeneric = true;
                    req.genericPermissions = CategoryPermissions;
                }
                next();
            }).forRoutes({ path: 'categories', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}