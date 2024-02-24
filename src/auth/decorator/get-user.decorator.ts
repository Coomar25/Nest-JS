import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data?.length > 0) {
      return request.user[data];
    }
    return request.user;
  },
);

// export const GetUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request: Express.Request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );
