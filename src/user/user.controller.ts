import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { AuthDto } from 'src/auth/dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async callGetMeFunc(@Req() req: any) {
        console.log("🚀 ~ UserController ~ callGetMeFunc ~ req.user:", req.user);
        return this.userService.getMeFunc(req.user);
    }

}
