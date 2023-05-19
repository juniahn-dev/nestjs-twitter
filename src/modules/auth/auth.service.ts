import { Inject, Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { IService } from 'src/interfaces/service.interface';
import { TWITTER_DATABASE } from 'src/libs/factories/twitter-database.factory';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthDAO } from './auth.dao';
import { SignInDAO } from './dao/signin-user.entity';

@Injectable()
export class AuthService implements IService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private authDAO: AuthDAO,
    @Inject(TWITTER_DATABASE) private twitterDB: Knex,
  ) {}

  async signUp(signinDto: SignInDAO): Promise<void> {
    this.logger.log('signup Service');

    try {
      return await this.authDAO.signUpUser(signinDto);
    } finally {
      await this.destroyConnection();
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInDAO> {
    this.logger.log('signin Service');

    try {
      const lists = await this.authDAO.signInUser(authCredentialsDto);

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
