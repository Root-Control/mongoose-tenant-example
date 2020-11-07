import { Connection, connections } from 'mongoose';
import { BrandSchema, BRAND_MODEL_TOKEN } from './schemas/brand.schema';
import { DB_CONNECTION_TOKEN, DATABASES } from '@src/server.constants';

export const brandProviders = [{
    provide: BRAND_MODEL_TOKEN,
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
			let dbConnection: any = connections.find((connection: Connection) => connection.name === DATABASES[i]);
    		await dbConnection.model(BRAND_MODEL_TOKEN, BrandSchema)
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];