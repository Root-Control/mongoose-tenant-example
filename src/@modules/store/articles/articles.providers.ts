import { Connection, connections } from 'mongoose';
import { ArticleSchema, ARTICLE_MODEL_TOKEN } from './schemas/article.schema';
import { DB_CONNECTION_TOKEN, DATABASES } from '@src/server.constants';

export const articleProviders = [{
    provide: ARTICLE_MODEL_TOKEN,
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
			let dbConnection: any = connections.find((connection: Connection) => connection.name === DATABASES[i]);
    		await dbConnection.model(ARTICLE_MODEL_TOKEN, ArticleSchema)
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];