import { HttpException, HttpStatus } from '@nestjs/common';

export const errorHandleExceptions = (error: any) => {
  if (error instanceof HttpException) return error;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error.code === 11000) throw new HttpException('The record already exists', HttpStatus.BAD_REQUEST);
  return new HttpException(
    `Sometime went wrong: ${error}`,
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
