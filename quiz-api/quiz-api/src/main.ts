import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // URL vašeg Angular frontenda
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Dozvoljene metode
    credentials: true, // Ako želite da prosleđujete cookies ili druge vrste ovlašćenja
    allowedHeaders: 'Content-Type, Authorization'
  });
  await app.listen(3000);
}
bootstrap();
