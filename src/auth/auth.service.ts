import { Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
@Injectable({})

export class AuthService {
    login() { }
    signup() {
        return {
            message: "Hi im sign up from auth service"
        }
    }
}