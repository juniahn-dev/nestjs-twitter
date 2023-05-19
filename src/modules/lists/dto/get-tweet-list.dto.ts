import { IsInt, IsNumber } from 'class-validator';

import { GetTweetListDAO } from '../dao/get-tweet-list.entity';

export class GetTweetListParamDTO {
  @IsNumber()
  @IsInt()
  userId: number;
}

export class GetTweetListResponseDTO {
  lists: GetTweetListDAO;
}
