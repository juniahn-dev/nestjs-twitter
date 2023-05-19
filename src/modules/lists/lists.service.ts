import { Inject, Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { TWITTER_DATABASE } from 'src/libs/factories/twitter-database.factory';
import { ListDAO } from './lists.dao';
import {
  GetTweetListParamDTO,
  GetTweetListResponseDTO,
} from './dto/get-tweet-list.dto';
import { IService } from 'src/interfaces/service.interface';

@Injectable()
export class ListsService implements IService {
  private readonly logger = new Logger('TweetListService');

  constructor(
    private listDAO: ListDAO,
    @Inject(TWITTER_DATABASE) private twitterDB: Knex,
  ) {}

  async getTweetList(
    query: GetTweetListParamDTO,
  ): Promise<GetTweetListResponseDTO> {
    this.logger.log('getTweetList Service');

    try {
      const lists = await this.listDAO.getTweetList(query);

      return lists;
    } finally {
      await this.destroyConnection();
    }
  }

  async destroyConnection(): Promise<void> {
    this.logger.log('destroyConnections');

    const twitterPromise = this.twitterDB.destroy();

    await Promise.all([twitterPromise]);
  }
}
