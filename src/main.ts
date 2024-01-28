import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv'
<<<<<<< HEAD
=======
import { ValidationPipe } from '@nestjs/common';
>>>>>>> d6c4ac98252d9a302c95b0b042b41914a7c303d0

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
>>>>>>> d6c4ac98252d9a302c95b0b042b41914a7c303d0
  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
