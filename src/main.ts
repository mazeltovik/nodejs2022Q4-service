import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserValidationPipe } from './users/validation/user-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new UserValidationPipe());
  await app.listen(4000);
}
bootstrap();
