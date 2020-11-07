import { createConnection, set, Connection, connections, ConnectionOptions, connect, model, pluralize } from 'mongoose';
import { SERVER_CONFIG, DB_CONNECTION_TOKEN } from '../server.constants';
import * as datasources from '../../datasources.json';

pluralize();

let opts: ConnectionOptions = {
    dbName: undefined,
    useNewUrlParser: true,
    keepAlive: true,
    socketTimeoutMS: 30000,
    poolSize: 100,
    useUnifiedTopology: true
};

export const databaseProviders = [{
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
        try {

            set('useCreateIndex', true);
            set('useFindAndModify', true);
            for (var i = 0; i < datasources.length; i++) {
                opts.dbName = datasources[i].name;
                const uri = `${datasources[i].protocol}://${datasources[i].user}:${datasources[i].password}@${datasources[i].cluster}/${datasources[i].name}?retryWrites=true&w=majority`;
                console.log('-------------- CREATE CONNECTION BEGIN-----------------');
                await createConnection(uri, opts);
            }
            console.log('CONNECTED');
            console.log('TO');
            datasources.forEach(ds => console.log(ds.name));
        } catch (ex) {
            console.log(ex);
        }
    }
}];