<<<<<<< HEAD
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
=======
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile, Patch, HttpException, HttpStatus } from '@nestjs/common';
>>>>>>> b55e49b3cfe16d3932d9b75b56e08d210d40075e
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe } from '@nestjs/common';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { UserEntity } from './entities/user.entity';

import { LoginResponseI, UserI } from './user.interface';
import { DtoHelperService } from './dto/dto-helper.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
<<<<<<< HEAD
=======
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { User } from 'src/decorators/user.decorators';
>>>>>>> b55e49b3cfe16d3932d9b75b56e08d210d40075e

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly dtoHelperService: DtoHelperService,
    ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    const userEntity: UserI = await this.dtoHelperService.createUserDtoToEntity(
      createUserDto,
    );
    return this.usersService.create(userEntity);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
    const userEntity: UserI = await this.dtoHelperService.loginUserDtoToEntity(
      loginUserDto,
    );
    const jwt: string = await this.usersService.login(userEntity);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 10000,
    };
  }


<<<<<<< HEAD


  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

=======
@Post(':id/upload-profile-image')
@UseInterceptors(FileInterceptor('file'))
@UseGuards(JwtAuthGuard)
async uploadProfileImage(
  @UploadedFile() file: Multer.File,
  @Param('id') id: number,
  ) {
  return this.usersService.updateUserProfileImage(id, file.buffer);
}

@Get('image')
@UseGuards(JwtAuthGuard)
async getProfileImage(
  @User() user: UserEntity,
  ) {
  return this.usersService.getUserProfileImage(user);
}

@Delete('/remove-profile-image')
@UseGuards(JwtAuthGuard)
async removeProfileImage(
  @User() user: UserEntity,
  ) {
  return this.usersService.removeProfileImage(user);
}

@UseGuards(JwtAuthGuard)
@Patch('update-pwd')
  async updatePassword(@User() user, @Body('password') newPassword: string){
    if (!newPassword) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }
    return await this.usersService.updatePassword(user.id,newPassword);
  }


@Get('username')
@UseGuards(JwtAuthGuard)
async getUsername(
  @User() user: UserEntity,
  ) {
  return this.usersService.getUsername(user);
}
@Get('')
@UseGuards(JwtAuthGuard)
async getUserDetails(
  @User() user: UserEntity,
  ) {
  return this.usersService.getUserDetails(user);
}

@Patch('/update/:id')
async update(@Param('id',ParseIntPipe) id : number, @Body() updateUserDto: UpdateUserDto) : Promise<UserI>  {
  console.log("hello from update in controller ")
  return this.usersService.updateUser(id,updateUserDto);
}

@Post()
async createUser(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}

>>>>>>> b55e49b3cfe16d3932d9b75b56e08d210d40075e
  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id/owned-groups')
  async getUserOwnedGroups(@Param('id') userId: number): Promise<GroupEntity[]> {
    return this.usersService.findUserOwnedGroups(userId);
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }



  

  
  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id : number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
