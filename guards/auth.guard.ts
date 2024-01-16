import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGurad implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const [type, token] = request.headers.authorization?.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('no Jwt token');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: 'secret',
        });
        request.user = payload;
        console.log(request.user);
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    } else {
      throw new UnauthorizedException('You need jwt');
    }

    return true;
  }
}
