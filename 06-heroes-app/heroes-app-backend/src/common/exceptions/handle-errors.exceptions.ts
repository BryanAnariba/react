import { HttpException, HttpStatus } from "@nestjs/common"

export const handleErrorsExceptions = (error: any) => {
  if (error instanceof HttpException) throw error;
  if (error.code === 11000) throw new HttpException(`Duplicated record.`, HttpStatus.BAD_REQUEST);
  throw new HttpException(`Sometime went wrong: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
}