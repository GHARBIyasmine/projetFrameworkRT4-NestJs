import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
<<<<<<< HEAD
export class UpdateUserDto extends PartialType(CreateUserDto) {
 

}
=======
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
  
>>>>>>> b55e49b3cfe16d3932d9b75b56e08d210d40075e
