import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getErrorMessage } from '@common/helpers/error-handler';
import { CrudService } from '@generics/crud/crud.service';

import { ICategory } from './interfaces/category.interface';
import { CATEGORY_MODEL_TOKEN } from './schemas/category.schema';
import { Pagination } from '@common/interfaces/pagination';

import { REQUEST } from '@nestjs/core';
import { Request } from '@common/interfaces/express-extension';

@Injectable()
export class CategorysService<Entity> extends CrudService<Entity> {
    categoryModel: Model<ICategory>;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        super(request, CATEGORY_MODEL_TOKEN)
        this.categoryModel = request.connection.model(CATEGORY_MODEL_TOKEN);
    }

    async findAllPaginated(query: any, pagination: Pagination) {
        try {
            return await this.categoryModel.find(query).skip(pagination.skip).limit(pagination.limit).lean();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
