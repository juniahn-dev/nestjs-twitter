import { DBProvider } from 'src/providers/db.provider';
import { Module } from '@nestjs/common';
import { TwitterDatabaseFactory } from 'src/libs/factories/twitter-database.factory';

@Module({
  imports: [],
  providers: [DBProvider, TwitterDatabaseFactory],
  exports: [TwitterDatabaseFactory],
})
export class TwitterDatabaseProvideModule {}
