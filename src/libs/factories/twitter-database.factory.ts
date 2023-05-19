import { DBProvider } from 'src/providers/db.provider';
import { FactoryProvider } from '@nestjs/common';

export const TWITTER_DATABASE = 'TWITTER_DATABASE';

export const TwitterDatabaseFactory: FactoryProvider = {
  provide: TWITTER_DATABASE,
  useFactory: (dbProvider: DBProvider) => {
    return dbProvider.getConnection();
  },
  inject: [DBProvider],
};
