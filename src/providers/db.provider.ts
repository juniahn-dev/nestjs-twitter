import { Injectable, Scope } from '@nestjs/common';

import { DbConfig } from './interfaces/database';
import { Knex } from 'nestjs-knex';
import { NestKnexProvider } from './nest-knex.provider';
import { toNumber } from 'lodash';

@Injectable({ scope: Scope.REQUEST })
export class DBProvider {
  getConnection(): Knex {
    const DB_CONFIG: DbConfig = {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: toNumber(process.env.DB_PORT),
      timezone: 'Z',
    };

    const provider = new NestKnexProvider(DB_CONFIG);

    return provider.getConnection('mysql2');
  }
}
