import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './common/config';

async function bootstrap() {
  const logger = new Logger('Calendar App');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(envs.port);
  
  logger.log(`===> Calendar App Backend is running on port: ${envs.port} <===`);
}
bootstrap();
