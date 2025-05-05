import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('===> UpTask App <===');
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:5173'] });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Nest server started on port ${process.env.PORT}`);
}
bootstrap();
