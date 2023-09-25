import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as basicAuth from 'basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const port = process.env.PORT || 8800;

  const app = await NestFactory.create(AppModule);
  app.use('/docs', (req: Request, res: Response, next: NextFunction) => {
    const credentials = basicAuth(req);

    if (
      !credentials ||
      credentials.name !== process.env.SWAGGER_USERNAME ||
      credentials.pass !== process.env.SWAGGER_PASSWORD
    ) {
      res.setHeader('WWW-Authenticate', 'Basic realm="swagger"');

      res.status(401).send('Unauthorized');
    } else {
      next();
    }
  });

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());

  const development = process.env.NODE_ENV === 'development' ? true : false;

  if (development) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('RBAC Testing Service')
      .setTermsOfService('Terms Of Service')
      .setDescription('------')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }

  await app.listen(port, () => {
    Logger.log(`App is running on port ${port}`);
  });
}
bootstrap();
