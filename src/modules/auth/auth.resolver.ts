import { UnauthorizedException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from '../user/dto/index.input';
import { AuthService } from './auth.service';
import { GetUserInfo, LoginOutput } from './dto/index.output';
import { isPublicResolver } from './jwtStratedy.guard';

@Resolver('auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, // private readonly userService: UsersService
  ) {}

  @isPublicResolver()
  @Mutation(() => LoginOutput)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const response = this.authService.login(user);

    return response;
  }

  @Mutation(() => LoginOutput)
  @isPublicResolver()
  async signin(@Args('user') userInput: UserInput) {
    return this.authService.signin(userInput);
  }

  @Query(() => GetUserInfo)
  getUserInfo(@Context() context: any): GetUserInfo {
    return context.req.user;
  }
}
