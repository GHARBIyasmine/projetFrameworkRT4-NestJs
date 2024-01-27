import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe } from '@nestjs/common';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
