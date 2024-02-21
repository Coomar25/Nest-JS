import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "src/config/config";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.TOKEN.access.secret,
        })
    }

    async generateAccessToken(id: number, role: string) {
        const payload = { id, role };
        return this.jwt.sign(payload, config.TOKEN.access);
    }

    async validate(payload: { id: number, role: string }) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: payload.id
            }
        });
        console.log("🚀 ~ JwtStrategy ~ validate ~ user:", user)
        return user;
    }

}