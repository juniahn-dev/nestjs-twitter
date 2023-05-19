import { Injectable, Scope } from '@nestjs/common';
import knex, { Knex } from 'knex';

import DatabaseProvider from './interfaces/database.abstract';
import { DbConfig } from './interfaces/database';

@Injectable({ scope: Scope.REQUEST })
export class NestKnexProvider extends DatabaseProvider {
  private _knexConnection: Knex;

  constructor(protected dbConfig: DbConfig) {
    super('NestKnexService');
  }

  getConnection(client = 'pg'): Knex {
    if (!this._knexConnection) {
      this.logger.log(`Create connection for "${this.dbConfig.host}"`);

      this._knexConnection = knex({
        client,
        connection: this.dbConfig,
        acquireConnectionTimeout: 10 * 1000, // Timeout 10s
      });
    }

    return this._knexConnection;
  }
}
