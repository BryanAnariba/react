import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { isObjectId } from '../utils/is-object-id.util';

@Injectable()
export class IsObjectIdPipe implements PipeTransform {
  transform(value: string) {
    const isValidObjectId = isObjectId(value);
    if (isValidObjectId) return value;
    throw new HttpException('Code or Id does not appear valid', HttpStatus.BAD_REQUEST);
  }
}
