import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class IsUuidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isObjectId = isValidObjectId(value);
    if (!isObjectId) throw new HttpException(`Code or Id doest not appear valid, it must be a object id.`, HttpStatus.BAD_REQUEST);
    return value;
  }
}
