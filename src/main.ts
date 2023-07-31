import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserValidationPipe } from './users/validation/user-validation.pipe';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

const port = process.env.PORT;
console.log(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new UserValidationPipe());
  const apiYamlPath = process.cwd() + '\\doc\\api.yaml';
  const apiYaml = await readFile(apiYamlPath, 'utf-8');
  const config = load(apiYaml);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
}
bootstrap();
