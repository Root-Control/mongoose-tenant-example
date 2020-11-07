import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getErrorMessage } from '@common/helpers/error-handler';
import { CrudService } from '@generics/crud/crud.service';

import { IInvoice } from './interfaces/invoice.interface';
import { INVOICE_MODEL_TOKEN } from './schemas/invoice.schema';
import { Pagination } from '@common/interfaces/pagination';

import { REQUEST } from '@nestjs/core';
import { Request } from '@common/interfaces/express-extension';

@Injectable()
export class InvoicesService<Entity> extends CrudService<Entity> {
    invoiceModel: Model<IInvoice>;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        super(request, INVOICE_MODEL_TOKEN)
        this.invoiceModel = request.connection.model(INVOICE_MODEL_TOKEN);
    }

    async findAllPaginated(query: any, pagination: Pagination) {
        try {
            return await this.invoiceModel.find(query).skip(pagination.skip).limit(pagination.limit).lean();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
