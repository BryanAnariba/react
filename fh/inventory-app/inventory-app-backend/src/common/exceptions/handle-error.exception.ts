import { HttpException, HttpStatus } from "@nestjs/common"

export const handleException = (error: any) => {
  if (error instanceof HttpException) throw error;
  throw new HttpException(`Somtime went wrong: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
}