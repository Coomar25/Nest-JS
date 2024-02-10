import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
@Injectable()

export class AuthService {
    constructor(private prisma: PrismaService) {
    }
    login() { }
    signup(dto: AuthDto) {
        console.log("🚀 ~ AuthController ~ callsignup ~ dto:", dto);
        return {
            message: "Hi im sign up from auth service",
            dto: dto
        }
    }
}