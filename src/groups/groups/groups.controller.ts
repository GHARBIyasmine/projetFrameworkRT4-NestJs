import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Patch } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ParseIntPipe } from '@nestjs/common';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { User } from 'src/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GroupEntity } from './entities/groups.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  // create new group

  @Post('new')
  @UseGuards(JwtAuthGuard)
  async createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @User() user: UserEntity) :Promise<Partial<GroupEntity>>{
    return this.groupsService.createNewGroup(createGroupDto, user);
  }

  // join a group
  @Post('join-code')
  @UseGuards(JwtAuthGuard)
  async joinGroupByCode(
    @Body('code') code: string,
    @User() user: UserEntity
  ): Promise<Partial<GroupEntity>> {

    return this.groupsService.joinGroupByCode(code, user)

  }

  @Post('join-public/:id')
  @UseGuards(JwtAuthGuard)
  async joinPublicGroup(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity
  ): Promise<Partial<GroupEntity>> {

    return this.groupsService.joinPublicGroup(id, user)

  }

  // update group  by id 

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto:UpdateGroupDto,
    @User() user: UserEntity
  ): Promise<GroupEntity>{

    
    return this.groupsService.updateGroup(id, updateGroupDto, user)

  }

  // 

  @Get('all-usernames/:id')
  @UseGuards(JwtAuthGuard)
  async getAllGroupCommunityUsernames(
    @Param('id') id: number): Promise<string[]> {
    return this.groupsService.getAllGroupCommunityUsernames(id);
  }


  @Get('all')
  @UseGuards(JwtAuthGuard)
  getAllGroups(
    @User() user: UserEntity
  ) : Promise<GroupEntity[]> {

    return this.groupsService.findAllGroups(user);
  }
  // get group by id 

  @Get('id/:id')
  @UseGuards(JwtAuthGuard)
  getGroupById(
    @User() user: UserEntity,
    @Param('id') id: number) {
    return this.groupsService.findById(id, user);
  }

  @Get('restore/:id')
  @UseGuards(JwtAuthGuard)
  async restoreGroup(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity
  ){
    return await this.groupsService.restoreGroup(id, user);
  }

  @Get('public-groups')
  @UseGuards(JwtAuthGuard)
  async getPublicGroupsWhereUserNotPartOf(
    @User()user: UserEntity): Promise<GroupEntity[]> {
      return this.groupsService.getPublicGroupsWhereUserNotPartOf(user)
    }

  @Delete('softDelete/:id')
  @UseGuards(JwtAuthGuard)
  async softDeleteGroup(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity
  ){
    return this.groupsService.softDeleteGroup(id, user);
  }

  @Post('leave/:id')
  @UseGuards(JwtAuthGuard)
  async leaveGroup(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity
  ){
    return this.groupsService.leaveGroup(id,user)
  }


  @Delete(':id')
  deleteGroup(@Param('id') id: number) {
    return this.groupsService.remove(id);
  }
}
