import { ListDAO } from './lists.dao';
import { ListsService } from './lists.service';
import { Module } from '@nestjs/common';
import { TweetListController } from './lists.controller';
import { TwitterDatabaseProvideModule } from '../common/twitter-database-provide.module';

@Module({
  imports: [TwitterDatabaseProvideModule],
  controllers: [TweetListController],
  providers: [ListsService, ListDAO],
})
export class ListsModule {}
