import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getErrorMessage } from '@common/helpers/error-handler';
import { CrudService } from '@generics/crud/crud.service';

import { ICart } from './interfaces/cart.interface';
import { CART_MODEL_TOKEN } from './schemas/cart.schema';
import { Pagination } from '@common/interfaces/pagination';

import { REQUEST } from '@nestjs/core';
import { Request } from '@common/interfaces/express-extension';

@Injectable()
export class CartsService<Entity> extends CrudService<Entity> {
    cartModel: Model<ICart>;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        super(request, CART_MODEL_TOKEN)
        this.cartModel = request.connection.model(CART_MODEL_TOKEN);
    }

    async findAllPaginated(query: any, pagination: Pagination) {
        try {
            return await this.cartModel.find(query).skip(pagination.skip).limit(pagination.limit).lean();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
