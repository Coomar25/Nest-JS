import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
    //what whitelist does is that it will remove any additional properties that are not defined in the DTO
  }));
  await app.listen(3333);
}
bootstrap();
