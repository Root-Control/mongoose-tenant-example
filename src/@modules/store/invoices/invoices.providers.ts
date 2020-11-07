import { Connection, connections } from 'mongoose';
import { InvoiceSchema, INVOICE_MODEL_TOKEN } from './schemas/invoice.schema';
import { DB_CONNECTION_TOKEN, DATABASES } from '@src/server.constants';

export const invoiceProviders = [{
    provide: INVOICE_MODEL_TOKEN,
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
			let dbConnection: any = connections.find((connection: Connection) => connection.name === DATABASES[i]);
    		await dbConnection.model(INVOICE_MODEL_TOKEN, InvoiceSchema)
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];