import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { config } from "../config/config"

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getMeFunc(user: any) {
        console.log("🚀 ~ UserService ~ getMeFunc ~ req:", user);

        const userProfile = await this.prisma.user.findFirst({
            where: {
                id: user.id
            }
        });
        return ({
            status: 200,
            message: "success",
            data: userProfile
        });
    }


}
