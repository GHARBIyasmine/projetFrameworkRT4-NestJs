import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
    
    @IsOptional()
    @IsString()
    username: string;
    
    @IsOptional()
    @IsString()
    password: string;
  

    @IsOptional()
    @IsString()
    email: string;
  
   
  }
  