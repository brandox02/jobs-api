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

  async getToken(inputUser: AuthenticatedUser) {
    const user = await this.userService.findOne({ id: inputUser.id });
    console.log(user);
    const accessToken = this.jwtService.sign(JSON.stringify(user));
    return {
      accessToken,
    };
  }

  async login(user: AuthenticatedUser): Promise<LoginOutput> {
    const token = await this.getToken(user);
    return token;
  }

  async signin(userInput: UserInput) {
    const { email, cedula } = userInput;
    const userRepo = this.dataSource.getRepository(User);
    const userFound = await userRepo
      .createQueryBuilder('user')
      .select('user')
      .where('user.email = :email or user.cedula = :cedula', {
        email,
        cedula,
      })
      .getOne();

    if (userFound) {
      throw ResourceExistsException('user');
    }

    const user = await userRepo.save(userRepo.create(userInput));

    const response = await this.getToken(user);
    return response;
  }
}
