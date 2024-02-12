import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, SigninDto } from "./dto";
import * as argon from "argon2";
import { ResponseEnum, RoleEnum } from "src/contstants/enum";
import { JwtService } from "@nestjs/jwt";
import { config } from "src/config/config";
@Injectable()

export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    async signToken(id: number, role: string): Promise<string> {
        const payload = { id, role };
        return this.jwt.sign(payload, config.TOKEN.access);
    }


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
            await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword
                }
            });

            return ({
                status: 201,
                message: ResponseEnum.SUCCESS,
            })
        } catch (error) {
            //throw error from a prisma client for the dublicate value
            if (error.code === "P2002") {
                throw new ForbiddenException("User already exists")
            }

            // return ({
            //     status: 500,
            //     message: ResponseEnum.SERVER_ERROR,
            //     data: error
            // })
        }
    }

    // login if the dto.password matches with the password in the database which is hashed
    async signin(dto: SigninDto) {
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
                });
            }
            const isPasswordValid = await argon.verify(user.password, dto.password);
            if (!isPasswordValid) {
                // throw new ForbiddenException(ResponseEnum.INVALID_CREDENTIAL)
                return ({
                    status: 401,
                    message: ResponseEnum.UNAUTHORIZED,
                    data: "Invalid Credential"
                });
            }

            const access = await this.signToken(user.id, RoleEnum.STUDENT);
            return ({
                status: 200,
                message: ResponseEnum.SUCCESS,
                access: access
            });
        } catch (error) {
            // if (error.code === "P2002") {
            //     throw new ForbiddenException("User already exists")
            // }
            return ({
                status: 500,
                message: ResponseEnum.SERVER_ERROR,
                data: error
            })
        }
    }


}