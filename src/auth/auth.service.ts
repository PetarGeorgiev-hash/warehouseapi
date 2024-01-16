import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(user: AuthDto) {
    const signedUp = await this.userService.signUp(user.email, user.password);
    const token = this.jwtService.sign({
      sub: signedUp.id,
      role: signedUp.role,
    });
    return token;
  }

  async signIn(user: AuthDto) {
    const logInUser = await this.userService.signIn(user.email, user.password);
    const token = this.jwtService.sign({
      sub: logInUser.id,
      role: logInUser.role,
    });
    return token;
  }
  async whoami(token: string) {
    const tokenWithoutBear = token.split(' ')[1];

    try {
      await this.jwtService.verifyAsync(tokenWithoutBear);
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return await this.jwtService.decode(tokenWithoutBear);
  }
}
