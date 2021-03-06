import { EnvironmentService } from '../environment';
import { extractKey } from '../utilities/keys';

const environmentService = new EnvironmentService('.env');
/**
 *  Creamos la interface IEnvironmentConfig la cual obtendrá todas
 *  las propiedades de nuestro entorno de trabajo.
 */
interface IEnvironmentConfig {
    serverConfigToken: string;
    environment: string;
    rootPath: string;
    httpPort: number;
    wsPort: number;
    jwtSecret: string;
    domain: string;
    httpProtocol: string;
    wsProtocol: string;
}

interface IDbConfig {
    coreDatabase: string;
    isAtlasCloud: boolean;
    defaultDatabase: string;
    dbConnectionToken: string;
    databaseProtocol: string;
    databaseUser: string;
    databasePassword: string;
    databaseCluster: string;
    databaseSeeding: boolean;
}

interface IMailingConfig {
    email: string;
    password: string;
}

interface IAwsConfig {
    s3Uploads: boolean;
    awsKey: string;
    awsSecret: string;
    awsBucket: string;
    awsAcl: string;    
}

console.log('http port?');
console.log(parseInt(environmentService.get('HTTP_SERVER_PORT')));

/**
 *  Seteamos la variable rootPath, para saber la ruta en la cual se encuentra el servidor.
 */
const rootPath = process.cwd();

/**
 *  En la constante jwtSecret asignamos la llave creada en /keys/jwt.private.key      t
 */
const jwtSecret = extractKey(`${rootPath}/keys/jwt.private.key`);
/**
 *  Definimos los valores para local y produccion      e
 */
const Config: IEnvironmentConfig = {
    serverConfigToken: environmentService.get('SERVER_CONFIG_TOKEN') || 'ServerConfigToken',
    environment: environmentService.get('NODE_ENV'),
    rootPath,
    httpPort: parseInt(environmentService.get('HTTP_SERVER_PORT')) || 8080,
    wsPort: parseInt(environmentService.get('WS_PORT')) || 8080,
    jwtSecret,
    domain: environmentService.get('DOMAIN') || 'localhost',
    httpProtocol: environmentService.get('HTTP_PROTOCOL') || 'http',
    wsProtocol: environmentService.get('WS_PROTOCOL') || 'ws',
};

const DbConfig: IDbConfig = {
    isAtlasCloud: eval(environmentService.get('IS_ATLAS_CLOUD')) || false,
    coreDatabase: environmentService.get('DEFAULT_DATABASE'),
    defaultDatabase: environmentService.get('CORE_DATABASE'),
    dbConnectionToken: 'DB_TOKEN',
    databaseProtocol: environmentService.get('DATABASE_PROTOCOL') || 'mongodb',
    databaseUser: environmentService.get('DATABASE_USER') || 'yourlocalUserdb',
    databasePassword: environmentService.get('DATABASE_PASSWORD') || 'yourlocalMongodbPassword',
    databaseCluster: environmentService.get('DATABASE_CLUSTER') || '',
    databaseSeeding: eval(environmentService.get('DATABASE_SEEDING')) || false
}

const AwsConfig: IAwsConfig = {
    s3Uploads: eval(environmentService.get('S3_UPLOADS')) || false,
    awsKey: environmentService.get('AWS_KEY') || '',
    awsSecret: environmentService.get('AWS_SECRET') || '',
    awsBucket: environmentService.get('AWS_BUCKET') || '',
    awsAcl: environmentService.get('AWS_ACL') || ''
}

const MailingConfig: IMailingConfig = {
    email: environmentService.get('MAILING_EMAIL') || '',
    password: environmentService.get('MAILING_PASSWORD') || ''
}

export {
    Config,
    DbConfig,
    AwsConfig,
    MailingConfig,
    IEnvironmentConfig,
    IDbConfig,
    IAwsConfig,
    IMailingConfig
};
