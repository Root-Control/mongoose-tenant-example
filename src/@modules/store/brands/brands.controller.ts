import {
    Controller,
    Post,
    Get,
    Put,
    Patch,
    Delete,
    Param,
    UseGuards,
    Inject,
    Header,
    Res,
    Query,
    Req
} from '@nestjs/common';

import { Request, Response } from '@common/interfaces/express-extension';

import { BrandsService } from './brands.service';

// Guards
import { RolesGuard, UserTypeGuard } from '@security/guards/app.guards';
import { Roles, UserType } from '@security/decorators/app.decorators';
import { CrudController } from '@generics/crud/crud.controller';
import { IBrand } from './interfaces/brand.interface';

@Controller('brands')
@UseGuards(RolesGuard, UserTypeGuard)
export class BrandsController extends CrudController<IBrand> {
    constructor(private readonly brandsService: BrandsService<IBrand>) {
        super(brandsService)
    }
}
