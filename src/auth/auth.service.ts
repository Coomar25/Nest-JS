import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { ResponseEnum } from "src/contstants/enum";
@Injectable()

export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            if (user) {
                return ({
                    status: 409,
                    message: ResponseEnum.CONFLICT,
                    data: "User already exists"
                });
            }
            const hashedPassword = await argon.hash(dto.password);
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword
                }
            });

            return ({
                status: 201,
                message: ResponseEnum.SUCCESS,
            })
        } catch (err) {
            return ({
                status: 500,
                message: ResponseEnum.SERVER_ERROR,
                data: err
            })
        }
    }

    // login if the dto.password matches with the password in the database which is hashed
    async signin(dto: AuthDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            if (!user) {
                return ({
                    status: 401,
                    message: ResponseEnum.UNAUTHORIZED,
                    data: "Invalid Credential"
                });
            }
            const isPasswordValid = await argon.verify(user.password, dto.password);
            if (!isPasswordValid) {
                return ({
                    status: 401,
                    message: ResponseEnum.UNAUTHORIZED,
                    data: "Invalid Credential"
                });
            }
            return ({
                status: 200,
                message: ResponseEnum.SUCCESS,
                data: "Login Successful"
            })
        } catch (err) {
            return ({
                status: 500,
                message: ResponseEnum.SERVER_ERROR,
                data: err
            })
        }
    }


}