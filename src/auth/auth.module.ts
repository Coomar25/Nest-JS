import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    // imports: [PrismaModule], // doing this need to import every time in every module
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }

