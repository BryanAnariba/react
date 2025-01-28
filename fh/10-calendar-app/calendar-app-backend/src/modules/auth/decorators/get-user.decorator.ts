import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user) return new HttpException(`User not logged or user not found`, HttpStatus.INTERNAL_SERVER_ERROR);
    if (!data || data.trim().length === 0) return req.user;
    return req.user[data];
  }
);