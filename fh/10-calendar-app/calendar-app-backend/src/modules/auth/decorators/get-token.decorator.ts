import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.token) throw new HttpException('Error!: token not found in request', HttpStatus.UNAUTHORIZED);
    return req.token;
  },
);