import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ResourceExistsException } from 'src/common/GqlExeptions/ResourceExistsException';
import { omit } from 'lodash';
import { UserInput } from '../user/dto/index.input';
import { UserService } from '../user/user.service';
import { LoginOutput } from './dto/index.output';

export type AuthenticatedUser = Omit<UserInput, 'password'>;
// export type LoginOutput = { accessToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectDataSource() private readonly dataSource: DataSource, // @Inject(forwardRef(() => UsersService)) // private readonly userService: UsersService
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.userService.findOne({ email });
    if (user && user.password === password) {
      const userPicked = omit(user, 'password');
      return userPicked;
    }
    return null;
  }

  getToken(user: AuthenticatedUser) {
    const accessToken = this.jwtService.sign(JSON.stringify(user));
    return {
      accessToken,
    };
  }

  login(user: AuthenticatedUser): LoginOutput {
    const token = this.getToken(user);
    return token;
  }

  async signin(userInput: UserInput) {
    const { email, password } = userInput;
    const userRepo = this.dataSource.getRepository(User);
    const userFound = await userRepo
      .createQueryBuilder('user')
      .select('user')
      .where('user.email = :email and user.password = :password', {
        email,
        password,
      })
      .getOne();

    if (userFound) {
      throw ResourceExistsException('user');
    }

    const user = await userRepo.save(userRepo.create(userInput));
    console.log({ user });
    const response = this.getToken(user);
    return response;
  }
}
