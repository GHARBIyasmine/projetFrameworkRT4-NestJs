import { IsString, IsOptional } from 'class-validator';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  url?: string;

}
