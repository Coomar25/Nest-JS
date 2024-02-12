import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { config } from "../config/config";
import { JwtStrategy } from "./strategy";

@Module({
    // imports: [PrismaModule], // doing this need to import every time in every module
    imports: [JwtModule.register({
        secret: config.TOKEN.access.secret,
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }

