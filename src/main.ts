import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserValidationPipe } from './users/validation/user-validation.pipe';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

import 'dotenv/config';
import { MyLogger } from './my-logger/my-logger.service';
import { HttpExceptionFilter } from './my-filter/http-exception.filter';

const port = process.env.PORT;
const pathToYaml = resolve(__dirname, '..', 'doc', 'api.yaml');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new MyLogger());
  try {
    const yamlFile = await readFile(pathToYaml, 'utf8');
    const yamlObject = yaml.load(yamlFile);
    SwaggerModule.setup('docs', app, yamlObject);
  } catch (e) {
    console.error(e.message);
  }
  app.useGlobalPipes(new UserValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
}
bootstrap();
