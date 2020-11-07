import { Connection, connections } from 'mongoose';
import { OrderSchema, ORDER_MODEL_TOKEN } from './schemas/order.schema';
import { DB_CONNECTION_TOKEN, DATABASES } from '@src/server.constants';

export const orderProviders = [{
    provide: ORDER_MODEL_TOKEN,
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
			let dbConnection: any = connections.find((connection: Connection) => connection.name === DATABASES[i]);
    		await dbConnection.model(ORDER_MODEL_TOKEN, OrderSchema)
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];