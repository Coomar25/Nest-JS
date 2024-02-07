import { Injectable } from "@nestjs/common";

@Injectable({})

export class AuthService {
    login() { }
    signup() {
        return {
            message: "Hi im sign up from auth service"
        }
    }
}