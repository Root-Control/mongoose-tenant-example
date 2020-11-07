import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getErrorMessage } from '@common/helpers/error-handler';
import { CrudService } from '@generics/crud/crud.service';

import { IBrand } from './interfaces/brand.interface';
import { BRAND_MODEL_TOKEN } from './schemas/brand.schema';
import { Pagination } from '@common/interfaces/pagination';

import { REQUEST } from '@nestjs/core';
import { Request } from '@common/interfaces/express-extension';

@Injectable()
export class BrandsService<Entity> extends CrudService<Entity> {
    brandModel: Model<IBrand>;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        super(request, BRAND_MODEL_TOKEN)
        this.brandModel = request.connection.model(BRAND_MODEL_TOKEN);
    }

}
