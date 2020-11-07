import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const options = new DocumentBuilder()
    .setTitle('Base BoilerPlate Application ')
    .setDescription('The cats API description')
    //.setVersion('1.0')
    .addTag('Architecture')
    .build();