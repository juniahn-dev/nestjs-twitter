import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';

import { Knex } from 'knex';
import {
  GetTweetListParamDTO,
  GetTweetListResponseDTO,
} from './dto/get-tweet-list.dto';
import { TWITTER_DATABASE } from 'src/libs/factories/twitter-database.factory';
import { GetTweetListDAO } from './dao/get-tweet-list.entity';

export class ListDAO {
  private readonly logger = new Logger('ListDAO');

  constructor(@Inject(TWITTER_DATABASE) private connection: Knex) {}

  async getTweetList(
    param: GetTweetListParamDTO,
  ): Promise<GetTweetListResponseDTO> {
    this.logger.log('getList DAO');

    const lists = await this.connection('POST').select<GetTweetListDAO>([
      'id',
      'user_id',
      'content',
      'create_at',
    ]);
    // .where('user_id', '=', param.userId);

    if (!lists) {
      throw new HttpException('Not exist content', HttpStatus.NOT_FOUND);
    }

    return { lists };
  }
}
