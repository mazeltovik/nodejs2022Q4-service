import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createErrorTemplate } from './my-filter.constants';
import { createWriteStream } from 'node:fs';
import { resolve } from 'path';
import { stat, readdir, mkdir, access } from 'node:fs/promises';
import { ErrorLog } from './my-filter.constants';

const maxErrorLogSize = Number(process.env.SIZE);

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  static logCount = 0;
  static initCalls = 0;
  static baseUrl: string = resolve(
    __dirname,
    './ErrorLogs',
    `logs${HttpExceptionFilter.logCount}.txt`,
  );
  constructor() {
    this.init();
  }
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const error = exception.name.replace(/Exception/i, '');
    const errLog = { statusCode: status, message, error };
    const path = request.url;
    await this.writeErrorLog(errLog, path);
    response.status(status).json(errLog);
  }
  async init() {
    const pathToErrorLogs = resolve(__dirname, './ErrorLogs');
    if (HttpExceptionFilter.initCalls == 0) {
      HttpExceptionFilter.initCalls += 1;
      try {
        await access(pathToErrorLogs);
        const files = await readdir(pathToErrorLogs);
        const lastFile = files.at(-1);
        const logNum = lastFile.replace(/[^\d]/g, '');
        HttpExceptionFilter.logCount = Number(logNum);
      } catch {
        await mkdir(pathToErrorLogs)
          .then(() => {
            createWriteStream(HttpExceptionFilter.baseUrl);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }
  async writeErrorLog(err: ErrorLog, path: string) {
    try {
      const { size } = await stat(HttpExceptionFilter.baseUrl);
      if (size >= maxErrorLogSize) {
        HttpExceptionFilter.logCount += 1;
        HttpExceptionFilter.baseUrl = resolve(
          __dirname,
          './ErrorLogs',
          `logs${HttpExceptionFilter.logCount}.txt`,
        );
      }
      const writable = createWriteStream(HttpExceptionFilter.baseUrl, {
        flags: 'a',
      });
      const data = createErrorTemplate(err, path);
      // process.stdout.write(data);
      writable.write(data);
    } catch (e) {
      console.log(e);
    }
  }
}
