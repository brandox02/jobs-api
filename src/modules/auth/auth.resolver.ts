import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthService } from './auth.service';
import { ChangePasswordInput } from './dto/ChangePassword.input';
import { LoginOutput } from './dto/index.output';
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

    const response = await this.authService.login(user);

    return response;
  }

  @Mutation(() => LoginOutput)
  @isPublicResolver()
  async signin(@Args('user') userInput: CreateUserInput) {
    return this.authService.signin(userInput);
  }

  @Mutation(() => String)
  async changePassword(@Args('input') input: ChangePasswordInput) {
    return this.authService.changePassword(input);
  }
}
