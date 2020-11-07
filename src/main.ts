import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { EnvironmentService } from './environment';
import { AppModule } from './app.module';

import { join } from 'path';

import { yellow } from 'chalk';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//import { HTTP_SERVER_PORT } from './server.constants';

const HTTP_SERVER_PORT = 3000;

//import { options } from '@documentation/options';

async function bootstrap() {
    const environment = new EnvironmentService('.env');
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
 
    //const document = SwaggerModule.createDocument(app, options);
    //SwaggerModule.setup('api', app, document);

    app.enableCors();
    app.setGlobalPrefix('api');
    app.useStaticAssets(join(__dirname, '/../public'));

    await app.listen(HTTP_SERVER_PORT);
    console.log(yellow('[ETD Core] V.2.0   -'));
    console.log(`Environment -> ${environment.get('NODE_ENV')}`);
    console.log(`Port -> ${HTTP_SERVER_PORT}`);
}
bootstrap();
