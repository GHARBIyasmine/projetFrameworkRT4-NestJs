
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GroupType } from '../entities/group-type.enum';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(GroupType)
  type: GroupType;

  @IsOptional()
  @IsString({each: true})
  tags: string[]

}
