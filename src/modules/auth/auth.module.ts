import { AuthController } from './auth.controller';
import { AuthDAO } from './auth.dao';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { TwitterDatabaseProvideModule } from '../common/twitter-database-provide.module';

@Module({
  imports: [TwitterDatabaseProvideModule],
  controllers: [AuthController],
  providers: [AuthService, AuthDAO],
})
export class AuthModule {}
