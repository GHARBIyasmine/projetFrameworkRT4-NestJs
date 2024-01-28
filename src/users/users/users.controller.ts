import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe } from '@nestjs/common';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { UserEntity } from './entities/user.entity';
import { LoginResponseI, UserI } from './user.interface';
import { DtoHelperService } from './dto/dto-helper.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly dtoHelperService: DtoHelperService,
    ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
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




  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id/owned-groups')
  async getUserOwnedGroups(@Param('id') userId: number): Promise<GroupEntity[]> {
    return this.usersService.findUserOwnedGroups(userId);
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }



  @Get()
  async findAllUsers() {
    return this.usersService.findAll();
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
