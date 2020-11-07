import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getErrorMessage } from '@common/helpers/error-handler';
import { CrudService } from '@generics/crud/crud.service';

import { IArticle } from './interfaces/article.interface';
import { ARTICLE_MODEL_TOKEN } from './schemas/article.schema';
import { Pagination } from '@common/interfaces/pagination';

import { REQUEST } from '@nestjs/core';
import { Request } from '@common/interfaces/express-extension';

@Injectable()
export class ArticlesService<Entity> extends CrudService<Entity> {
    articleModel: Model<IArticle>;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        super(request, ARTICLE_MODEL_TOKEN)
        this.articleModel = request.connection.model(ARTICLE_MODEL_TOKEN);
    }

    async findAllPaginated(query: any, pagination: Pagination) {
        try {
            return await this.articleModel.find(query).skip(pagination.skip).limit(pagination.limit).lean();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
