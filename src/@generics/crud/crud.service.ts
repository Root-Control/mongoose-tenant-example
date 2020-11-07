import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { QueryFindOptions, QueryFindBaseOptions, QueryFindOneAndUpdateOptions, QueryFindOneAndRemoveOptions, Types } from 'mongoose';
import { getErrorMessage } from '../../common/helpers/error-handler';
import { ICrudService } from './crud.interface';
import { IPagination } from './pagination/pagination';

@Injectable()
export class CrudService<Entity> implements ICrudService<Entity> {
    private repository: any;
    constructor(request, private readonly modelToken: string) {
        const connection = request.connection;
        this.repository = connection?.model(modelToken);
    }

    async create(model: Entity):Promise<Entity> {
        try {
            return await this.repository.create(model);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async findAll(query?: QueryFindOptions):Promise<IPagination<Entity>> {
        try {
            const total = await this.repository.countDocuments(query);
            const items = await this.repository.find(query).lean();
            return { items, total };
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async findById(id: Types.ObjectId): Promise<Entity> {
        try {
            const model = await this.repository.findById(id);
            if (model) {
                return model;
            } else {
                throw new HttpException(`No ${this.modelToken} with that identifier has been found`, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return model;
        } catch (ex) {
             throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async findOne(conditions: QueryFindOptions):Promise<Entity> {
        try {
            return await this.repository.findOne(conditions);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async findOneAndUpdate(id: Types.ObjectId, newModel: Entity): Promise<any> {
        try {
            const model = await this.repository.findOneAndUpdate({ _id: id }, newModel, { new: true });
            if (model) {
                return model;
            } else {
                throw new HttpException(`No ${this.modelToken} with that identifier has been found`, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return model;
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async findOneAndDelete(id: Types.ObjectId) {
        try {
            const result = await this.repository.findOneAndDelete({ _id: id }, {});
            console.log('result here');
            console.log(result);
            return result;
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async count(query?: QueryFindOptions) {
        try {
            return await this.repository.countDocuments(query);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }        
    }
}
