import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { UserEntity } from 'src/users/users/entities/user.entity';

export class CreateTaskDto {
  
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  assignee: string

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dueDate: Date

}
