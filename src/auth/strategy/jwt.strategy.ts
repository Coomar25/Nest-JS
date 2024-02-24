import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'src/config/config';
import { RoleEnum } from 'src/contstants/enum';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.TOKEN.access.secret,
    });
  }
  async validate(payload: { id: number; role: string }) {
    switch (payload.role) {
      case RoleEnum.STUDENT:
        const user = await this.prisma.user.findFirst({
          where: {
            id: payload.id,
          },
        });
        console.log('🚀 ~ JwtStrategy ~ validate ~ user:', user);
        return user;
        break;
      case RoleEnum.TEACHER:
        const user_teacher = await this.prisma.bookmark.findFirst({
          where: {
            id: payload.id,
          },
        });
        return user_teacher;
        break;
      case RoleEnum.ADMIN:
        const user_admin = await this.prisma.bookmark.findFirst({
          where: {
            id: payload.id,
          },
        });
        return user_admin;
        break;
    }
  }
}
