import {
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { Knex } from 'knex';
import { TWITTER_DATABASE } from 'src/libs/factories/twitter-database.factory';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { SignInDAO } from './dao/signin-user.entity';
import * as bcrypt from 'bcryptjs';
import { isEmpty } from 'lodash';
import { SignInDto } from './dto/signin-user.dto';

export class AuthDAO {
  private readonly logger = new Logger('AuthDAO');

  constructor(@Inject(TWITTER_DATABASE) private connection: Knex) {}

  async signUpUser(signinDto: SignInDto): Promise<void> {
    this.logger.log('signup DAO');

    const { email, password, name } = signinDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.connection('USER').insert({
        email,
        password: hashedPassword,
        name,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async signInUser(authCredentialsDto: AuthCredentialsDto): Promise<SignInDAO> {
    this.logger.log('signin DAO');

    const { email, password } = authCredentialsDto;

    const lists = await this.connection('USER')
      .select<SignInDAO[]>([
        'id',
        'email',
        'password',
        'name',
        'create_at',
        'change_at',
        'state',
      ])
      .where('email', '=', email);

    const user = lists[0];

    if (!isEmpty(lists) && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException('login filed');
    }
  }
}
