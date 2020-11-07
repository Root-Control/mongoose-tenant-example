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

import { ArticlesService } from './articles.service';

// Guards
import { RolesGuard, UserTypeGuard } from '@security/guards/app.guards';
import { Roles, UserType } from '@security/decorators/app.decorators';
import { CrudController } from '@generics/crud/crud.controller';
import { IArticle } from './interfaces/article.interface';

@Controller('articles')
@UseGuards(RolesGuard, UserTypeGuard)
export class ArticlesController extends CrudController<IArticle> {
    constructor(private readonly articlesService: ArticlesService<IArticle>) {
        super(articlesService)
    }

    /*
        Route:        GET api/article/chunk
        Roles:        user, admin
        Description:  Get data by parts
    */
    @Header('Cache-Control', 'no-cache')
    @Header('Content-Type', 'text/event-stream')
    @Header('Transfer-Encoding', 'chunked')
    @Get('chunk')
    async chunkData(@Query() query: {}, @Res() res: Response, @Req() req: Request) {
        let requestClosed: boolean = false;

        req.on('close', () => requestClosed = true);

        let filter = {
            chunks: 0,
            skip: 0,
            limit: 0
        };

        const totalRecords = await this.articlesService.count(query);
        filter.chunks = totalRecords / 3000;
        filter.limit = 3000;

        for (let i = 0; i < filter.chunks; i++) {
            let results = await this.articlesService.findAllPaginated(query, filter);
            console.log(`${filter.skip} of ${totalRecords} \n\n`);
            if (!requestClosed) {
                res.write(`data: ${filter.skip} ${JSON.stringify(results)} of ${totalRecords} \n\n`);
            } else {
                break;
            }
            
            filter.skip = filter.skip + filter.limit;
        }
        return res.end();
    }

}
