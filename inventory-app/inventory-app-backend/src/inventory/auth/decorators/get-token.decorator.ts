import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export const GetToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.token) throw new HttpException(`Error!: user logged token not found in request.`, HttpStatus.UNAUTHORIZED); // DEBERIA SER 500?
    return req.token;
  }
)