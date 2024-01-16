import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() user: AuthDto) {
    return this.authService.signUp(user);
  }

  @Post('/signin')
  signIn(@Body() user: AuthDto) {
    return this.authService.signIn(user);
  }

  @Get('/whoami')
  getCurrentUser(@Req() request: Request) {
    const headers = request.headers;
    const authHeader = headers['authorization'];
    return this.authService.whoami(authHeader);
  }
}
