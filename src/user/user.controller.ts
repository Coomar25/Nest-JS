import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async callGetMeFunc(@GetUser() user: User, @GetUser('email') email: string) {
    console.log('🚀 ~ UserController ~ callGetMeFunc ~ email:', email);
    console.log('🚀 ~ UserController ~ callGetMeFunc ~ user:', user);
    return this.userService.getMeFunc(user);
  }
}
