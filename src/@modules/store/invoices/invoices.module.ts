import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { Request, Response } from '@common/interfaces/express-extension';

import { DatabaseModule } from '@database';
import { InvoicesController } from './invoices.controller';
import { invoiceProviders } from './invoices.providers';
import { InvoicesService } from './invoices.service';

import { InvoicePermissions } from './schemas/invoice.schema';

@Module({
    imports: [DatabaseModule],
    controllers: [InvoicesController],
    providers: [
        ...invoiceProviders,
        InvoicesService
    ],
    exports: [
        ...invoiceProviders
    ]
})
export class InvoicesModule implements NestModule {
    protected isGeneric: boolean = false;
    public configure(consumer: MiddlewareConsumer) {
        this.isGeneric = true;
        consumer
            .apply((req: Request, res: Response, next: Function) => {
                if (this.isGeneric) {
                    req.isGeneric = true;
                    req.genericPermissions = InvoicePermissions;
                }
                next();
            }).forRoutes({ path: 'invoices', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}