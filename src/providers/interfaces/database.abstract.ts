import { Knex } from 'knex';
import { Logger } from '@nestjs/common';

type SupportDatabase = Knex;

interface IDatabaseProvider {
  getConnection: () => SupportDatabase;
}

abstract class DatabaseProvider implements IDatabaseProvider {
  protected readonly logger: Logger;

  constructor(service: string) {
    this.logger = new Logger(service);
  }

  abstract getConnection(): SupportDatabase;
}

export default DatabaseProvider;
