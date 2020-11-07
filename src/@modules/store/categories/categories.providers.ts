import { Connection, connections } from 'mongoose';
import { CategorySchema, CATEGORY_MODEL_TOKEN } from './schemas/category.schema';
import { DB_CONNECTION_TOKEN, DATABASES } from '@src/server.constants';

export const categoryProviders = [{
    provide: CATEGORY_MODEL_TOKEN,
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
			let dbConnection: any = connections.find((connection: Connection) => connection.name === DATABASES[i]);
    		await dbConnection.model(CATEGORY_MODEL_TOKEN, CategorySchema)
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];