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
    Req, 
    Query,
    Body,
    Res,
    Header
} from '@nestjs/common';

import { Request } from '@common/interfaces/express-extension';

import { CrudService } from './crud.service';

import { GenericPermissionRolesGuard } from '../../@security/guards/app.guards';
import { GenericPermissions } from '../../@security/decorators/app.decorators';

import { QueryFindOptions, Types  } from 'mongoose';

// Guards
//import { RolesGuard, UserTypeGuard } from '../../@security/guards/app.guards';
//import { Roles, UserType } from '../../@security/decorators/app.decorators';

@UseGuards(GenericPermissionRolesGuard)
export class CrudController<Entity> {
    constructor(private readonly crudService: CrudService<Entity>) {

    }
    /* --------------------------------------------------------------------

    Module     : Articles
    Controller : Article Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.model value.

    Middleware description:

    Route:
    /api/model
    ----------------------------------------------------------------------*/

    /*
        Route:        Post api/model
        Roles:        user, admin
        Description:  Create a new Article
    */
    @GenericPermissions('create')
    @Post('')
    async create(@Body() body: any, @Req() req: Request) {
        body.creator = req.user ? (req as any).user._id: null;
        return await this.crudService.create(body);
    }


    /*
        Route:        GET api/model
        Roles:        user, admin
        Description:  Get list of model
    */

    @GenericPermissions('findAll')
    @Get('')
    async findAll(@Query() query: QueryFindOptions) {
        console.time('Find');
        const model = await this.crudService.findAll(query);
        console.timeEnd('Find');
        return model;
    }


    /*
        Route:        GET api/model/count
        Roles:        user, admin
        Description:  Count provided model
    */
    @GenericPermissions('count')
    @Get('count')
    async countDocuments(@Query() query: QueryFindOptions) {
        console.time('Count');
        const result =  await this.crudService.count(query);
        console.timeEnd('Count');
        return result;
    }

    /*
        Route:        Get api/model/:id
        Roles:        user, admin
        Description:  Find model by id clause
    */
    @GenericPermissions('findById')
    @Get(':id')
    async findById(@Param('id') id: Types.ObjectId) {
        return await this.crudService.findById(id);
    }


    /*
        Route:        PUT api/model/:id
        Roles:        user, admin
        Description:  Update provided model by Id, replacing by body params
    */
    @GenericPermissions('findOneAndUpdate')
    @Put(':id')
    async update(@Param('id') id: Types.ObjectId, @Body() body: any) {
        const model = await this.crudService.findOneAndUpdate(id, body);
        return model;
    }

    /*
        Route:        DELETE api/model/:id
        Roles:        user, admin
        Description:  Delete provided model by Id
    */
    @GenericPermissions('findOneAndDelete')
    @Delete(':id')
    async delete(@Param('id') id: Types.ObjectId) {
        return await this.crudService.findOneAndDelete(id);
    }
}
