import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GroupType } from '../entities/group-type.enum';
import { TagEntity } from 'src/tag/entities/tag.entity';

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
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => TagEntity) // Convert each item to TagEntity instance
  tags: TagEntity[];
}