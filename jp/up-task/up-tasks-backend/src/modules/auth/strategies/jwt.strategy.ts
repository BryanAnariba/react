import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/users/schemas/user.schemas';
import { JwtPayload } from '../types';
import { UsersService } from 'src/modules/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStratey extends PassportStrategy(Strategy) {
  constructor(
    private readonly UsersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const { _id } = payload;
    const user = await this.UsersService.findOne(_id);
    if (!user) throw new UnauthorizedException(`Token is not valid!`);
    if (!user.isActive) throw new UnauthorizedException(`User is not active talk with an admin!`);
    return user;
  }
}
