import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

export async function bootstrap() {
  const logger = new Logger('Tickets App Server');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
  
  logger.log(`Nest server started on port: ${process.env.PORT || 3000}`);
}
void bootstrap();
