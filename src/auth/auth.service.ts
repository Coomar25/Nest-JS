import { Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()

export class AuthService {
    constructor(private prisma: PrismaService) {
    }
    login() { }
    signup() {
        return {
            message: "Hi im sign up from auth service"
        }
    }
}