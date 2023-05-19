import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TwitterModule } from './modules/twitter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TwitterModule,
  ],
})
export class AppModule {}
