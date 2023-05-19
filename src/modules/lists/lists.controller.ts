import { Controller, Get, Param } from '@nestjs/common';
import {
  GetTweetListParamDTO,
  GetTweetListResponseDTO,
} from './dto/get-tweet-list.dto';
import { ListsService } from './lists.service';

@Controller({
  path: 'list',
})
export class TweetListController {
  constructor(private tweetListService: ListsService) {}

  @Get()
  async lists(
    @Param() param: GetTweetListParamDTO,
  ): Promise<GetTweetListResponseDTO> {
    const lists = await this.tweetListService.getTweetList(param);

    return lists;
  }
}
