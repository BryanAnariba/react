import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class ChangeTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  public status;
}
