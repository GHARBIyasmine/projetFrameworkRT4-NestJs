import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ParseIntPipe } from '@nestjs/common';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { User } from 'src/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('new')
  @UseGuards(JwtAuthGuard)
  createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @User() user: UserEntity) {
    return this.groupsService.createNewGroup(createGroupDto, user);
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
