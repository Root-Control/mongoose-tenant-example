import { Connection, connections } from 'mongoose';
import { CartSchema, CART_MODEL_TOKEN } from './schemas/cart.schema';
import { DB_CONNECTION_TOKEN, DATABASES } from '@src/server.constants';

export const cartProviders = [{
    provide: CART_MODEL_TOKEN,
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
			let dbConnection: any = connections.find((connection: Connection) => connection.name === DATABASES[i]);
    		await dbConnection.model(CART_MODEL_TOKEN, CartSchema)
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];