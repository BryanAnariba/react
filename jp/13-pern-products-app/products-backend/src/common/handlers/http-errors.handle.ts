import { HttpException, HttpStatus } from "@nestjs/common"
import { QueryFailedError } from "typeorm";

export const HttpErrorHandler = (httpError: any): HttpException => {
    if (httpError instanceof QueryFailedError && httpError.message.includes('duplicate key')) throw new HttpException('Duplicated record', HttpStatus.BAD_REQUEST);
    if (httpError instanceof HttpException) throw httpError;
    throw new HttpException(`Sometime went wrong: ${httpError}`, HttpStatus.INTERNAL_SERVER_ERROR);
}