import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, ListsModule],
})
export class TwitterModule {}
