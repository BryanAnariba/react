import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../enums';

export class ChangeStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
