<<<<<<< HEAD
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

=======
import { IsNotEmpty, IsString } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
>>>>>>> d6c4ac98252d9a302c95b0b042b41914a7c303d0
 
}
