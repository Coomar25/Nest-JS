import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get('me')
    @UseGuards(JwtGuard)
    async callGetMeFunc(@Req() req: any) {
        console.log("🚀 ~ UserController ~ callGetMeFunc ~ req.user:", req.user);
        return this.userService.getMeFunc(req.user);
    }

}