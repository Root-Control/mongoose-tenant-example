import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { Request, Response } from '@common/interfaces/express-extension';

import { DatabaseModule } from '@database';
import { BrandsController } from './brands.controller';
import { brandProviders } from './brands.providers';
import { BrandsService } from './brands.service';

import { BrandPermissions } from './schemas/brand.schema';

@Module({
    imports: [DatabaseModule],
    controllers: [BrandsController],
    providers: [
        ...brandProviders,
        BrandsService
    ],
    exports: [
        ...brandProviders
    ]
})
export class BrandsModule implements NestModule {
    protected isGeneric: boolean = false;
    public configure(consumer: MiddlewareConsumer) {
        this.isGeneric = true;
        consumer
            .apply((req: Request, res: Response, next: Function) => {
                if (this.isGeneric) {
                    req.isGeneric = true;
                    req.genericPermissions = BrandPermissions;
                }
                next();
            }).forRoutes({ path: 'brands', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}