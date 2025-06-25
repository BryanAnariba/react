import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isObjectId } from '../utils/is-object-id.util';

@Injectable()
export class IsObjectIdPipe implements PipeTransform {
  transform(value: string) {
    const isObjectIdValue = isObjectId(value);
    if (!isObjectIdValue) throw new BadRequestException(`Invalid ObjectId: ${value}`);
    return value;  
  }
}
