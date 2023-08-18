import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { createWriteStream } from 'node:fs';
import { resolve } from 'path';
import { stat, readdir, mkdir, access } from 'node:fs/promises';
import { createTemplate } from './my-logger.constants';

const maxSize = Number(process.env.SIZE);

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  static logCount = 0;
  static initCalls = 0;
  static baseUrl: string = resolve(
    __dirname,
    './successLogs',
    `logs${MyLogger.logCount}.txt`,
  );
  constructor() {
    super();
    this.init();
  }

  async customLog(url: string, param: string, body: string, status: number) {
    try {
      const { size } = await stat(MyLogger.baseUrl);
      if (size >= maxSize) {
        MyLogger.logCount += 1;
        MyLogger.baseUrl = resolve(
          __dirname,
          './successLogs',
          `logs${MyLogger.logCount}.txt`,
        );
      }
      const writable = createWriteStream(MyLogger.baseUrl, {
        flags: 'a',
      });
      const data = createTemplate(
        this.context,
        this.getTimestamp(),
        url,
        param,
        body,
        status,
      );

      // process.stdout.write(data);
      writable.write(data);
    } catch (e) {
      console.log(e);
    }
  }
  async init() {
    const pathToSuccsesLogs = resolve(__dirname, './successLogs');
    if (MyLogger.initCalls == 0) {
      MyLogger.initCalls += 1;
      try {
        await access(pathToSuccsesLogs);
        const files = await readdir(pathToSuccsesLogs);
        const lastFile = files.at(-1);
        const logNum = lastFile.replace(/[^\d]/g, '');
        MyLogger.logCount = Number(logNum);
      } catch {
        await mkdir(pathToSuccsesLogs)
          .then(() => {
            createWriteStream(MyLogger.baseUrl);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }
}
