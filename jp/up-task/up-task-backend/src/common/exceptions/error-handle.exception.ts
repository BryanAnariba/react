import { HttpException, HttpStatus } from '@nestjs/common';

export const errorHandleExceptions = (error) => {
  if (error instanceof HttpException) return error;
  return new HttpException(
    `Sometime went wrong: ${error}`,
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
