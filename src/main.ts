import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserValidationPipe } from './users/validation/user-validation.pipe';
import 'dotenv/config';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new UserValidationPipe());
  await app.listen(port);
}
bootstrap();
