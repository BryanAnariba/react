import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

export async function bootstrap() {
  const logger = new Logger("TICKET WEB APP");

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
  }));

  logger.log(`Server started on port: ${process.env.PORT ?? 3000}`);
}
void bootstrap();
