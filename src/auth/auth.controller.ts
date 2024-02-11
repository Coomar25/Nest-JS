// type @controller and hit enter
import { Body, Controller, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto, SigninDto } from "./dto";
@Controller('/auth')

export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("callRoutesByName")
    async callingSignin() {
        return 'whatever with Content Type Html  if it is in string coz nest js handle header type data by default in speficic formar  json data response is shown in bellow format'
    }

    @Post("jsonRoutes")
    async getJsonResponse() {
        return {
            msg: "Success response in json format"
        }
    }

    // dto stands for data transfer object which is used to validate the incoming data from the client side 
    @Post('signup')
    async callsignup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('siginin')
    async signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto);
    }
}