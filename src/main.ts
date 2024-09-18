import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './shared/config/';

async function bootstrap() {
  const logger = new Logger('DemoApp');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const configAPI = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Demo Restful API')
    .setDescription('Demo API endpoints')
    .setVersion('1.0')
    .build();
  const documentAPI = SwaggerModule.createDocument(app, configAPI);
  SwaggerModule.setup('docs', app, documentAPI);

  await app.listen(envs.port);
  logger.log(`Application running on port ${envs.port}`);
}
bootstrap();
