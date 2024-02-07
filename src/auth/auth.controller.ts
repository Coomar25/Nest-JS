// type @controller and hit enter
import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

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


    @Post('signup')
    async callsignup() {
        return this.authService.signup();
    }

    @Post('siginin')
    async signin() {
        return 'im sign in'
    }
}