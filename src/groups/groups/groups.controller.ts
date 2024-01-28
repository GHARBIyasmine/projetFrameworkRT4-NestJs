import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ParseIntPipe } from '@nestjs/common';
import { UserEntity } from 'src/users/users/entities/user.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get(':id/members')
  async getGroupMembers(@Param('id') groupId: number): Promise<UserEntity[]> {
    return this.groupsService.getGroupMembers(groupId);
  }

  @Get(':id')
  findGroupById(@Param('id') id: number) {
    return this.groupsService.findOne(id);
  }

  @Get()
  findAllGroups() {
    return this.groupsService.findAll();
  }

  @Put(':id')
  updateGroup(@Param('id', ParseIntPipe) id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  deleteGroup(@Param('id') id: number) {
    return this.groupsService.remove(id);
  }
}
