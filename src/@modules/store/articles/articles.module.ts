import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { Request, Response } from '@common/interfaces/express-extension';

import { DatabaseModule } from '@database';
import { ArticlesController } from './articles.controller';
import { articleProviders } from './articles.providers';
import { ArticlesService } from './articles.service';

import { ArticlePermissions } from './schemas/article.schema';

@Module({
    imports: [DatabaseModule],
    controllers: [ArticlesController],
    providers: [
        ...articleProviders,
        ArticlesService
    ],
    exports: [
        ...articleProviders
    ]
})
export class ArticlesModule implements NestModule {
    protected isGeneric: boolean = false;
    public configure(consumer: MiddlewareConsumer) {
        this.isGeneric = true;
        consumer
            .apply((req: Request, res: Response, next: Function) => {
                if (this.isGeneric) {
                    req.isGeneric = true;
                    req.genericPermissions = ArticlePermissions;
                }
                next();
            }).forRoutes({ path: 'articles', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}