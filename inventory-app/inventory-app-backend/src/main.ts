import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envVariables } from './inventory/core/config';

async function bootstrap() {
  const logger = new Logger('Inventory App');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(envVariables.port);

  logger.log(`===>Inventory App running on port: ${envVariables.port}<===`);
}
bootstrap();
