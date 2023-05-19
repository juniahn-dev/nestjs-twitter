import { ListsModule } from './lists/lists.module';
import { LoginModule } from './login/login.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [LoginModule, ListsModule],
})
export class TwitterModule {}
