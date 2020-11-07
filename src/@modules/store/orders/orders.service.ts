import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getErrorMessage } from '@common/helpers/error-handler';
import { CrudService } from '@generics/crud/crud.service';

import { IOrder } from './interfaces/order.interface';
import { ORDER_MODEL_TOKEN } from './schemas/order.schema';
import { Pagination } from '@common/interfaces/pagination';

import { REQUEST } from '@nestjs/core';
import { Request } from '@common/interfaces/express-extension';

@Injectable()
export class OrdersService<Entity> extends CrudService<Entity> {
    orderModel: Model<IOrder>;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        super(request, ORDER_MODEL_TOKEN)
        this.orderModel = request.connection.model(ORDER_MODEL_TOKEN);
    }

    async findAllPaginated(query: any, pagination: Pagination) {
        try {
            return await this.orderModel.find(query).skip(pagination.skip).limit(pagination.limit).lean();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
