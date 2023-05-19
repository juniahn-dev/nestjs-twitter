import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Module } from '@nestjs/common';
import { TwitterDatabaseProvideModule } from '../common/twitter-database-provide.module';

@Module({
  imports: [TwitterDatabaseProvideModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
