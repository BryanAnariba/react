import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user) throw new HttpException(`Error!: logged user not found in request`, HttpStatus.UNAUTHORIZED); // NO DEBERIA SER 500?
    if (!data || data.trim().length === 0) return req.user;
    return req.user[data];
  },
)