import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environmentVars } from './common/config';

async function bootstrap() {
  const logger = new Logger('Heroes App');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidUnknownValues: true,
  }));
  app.setGlobalPrefix('api');
  await app.listen(environmentVars.port);
  logger.log(`====> Heroes App server started on port ${environmentVars.port} <====`);
}
bootstrap();
