import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ResourceExistsException } from 'src/common/GqlExeptions/ResourceExistsException';
import { omit } from 'lodash';
import { UserService } from '../user/user.service';
import { LoginOutput } from './dto/index.output';
import { CreateUserInput } from '../user/dto/create-user.input';
import * as bcrypt from 'bcrypt';

export type AuthenticatedUser = Omit<User, 'password'>;
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
    const desHashedPasswordIsEqual: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (user && desHashedPasswordIsEqual) {
      const userPicked = omit(user, 'password');
      return userPicked;
    }
    return null;
  }

  async getToken(inputUser: AuthenticatedUser): Promise<string> {
    const user = await this.userService.findOne({ id: inputUser.id });

    const accessToken = this.jwtService.sign(JSON.stringify(user));
    return accessToken;
  }

  async login(user: AuthenticatedUser): Promise<LoginOutput> {
    const token = await this.getToken(user);

    return { accessToken: token, user: { ...user, password: null } };
  }

  async signin(userInput: CreateUserInput): Promise<LoginOutput> {
    const { email } = userInput;
    const userRepo = this.dataSource.getRepository(User);
    const userFound = await userRepo
      .createQueryBuilder('user')
      .select('user')
      .where('user.email = :email', {
        email,
      })
      .getOne();

    if (userFound) {
      throw ResourceExistsException('user');
    }

    // hashing password
    const salt = await bcrypt.genSalt();
    userInput.password = await bcrypt.hash(userInput.password, salt);

    const user = await userRepo.save(userRepo.create(userInput));

    const token = await this.getToken(user);
    return { accessToken: token, user };
  }
}
