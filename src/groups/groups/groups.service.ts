import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { CrudService } from 'src/common/crud/crud.service';
import { NotificationService } from 'src/notifications/notifications/services/notifications.service';
import { TaskEntity } from 'src/tasks/tasks/entities/tasks.entity';
import { ResourceEntity } from 'src/resources/resources/entities/resources.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { TagService } from 'src/tag/tag.service';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { GenerateCode } from './functions/code-generator.functiom';
import { UsersService } from 'src/users/users/users.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserRoleEnum } from 'src/users/users/entities/user-role.enum';


@Injectable()
export class GroupsService extends CrudService<GroupEntity> {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupsRepository: Repository<GroupEntity>,
    private readonly tagService: TagService,
    private readonly userService: UsersService

  ) {
    super(groupsRepository);
  }

  async createNewGroup(newGroupDto: CreateGroupDto, user: UserEntity): Promise<Partial<GroupEntity>> {
    const tagPromises: Promise<TagEntity>[] = [];
    if (newGroupDto.tags){
    newGroupDto.tags.forEach(tagEntity => {
        tagPromises.push(this.tagService.addNewTagIfNotExists(tagEntity.value));
    });

        const tags = await Promise.all(tagPromises);
        newGroupDto.tags = tags;
  }
        const newGroup = this.groupsRepository.create(newGroupDto);
        newGroup.groupCode = GenerateCode()
        newGroup.owner = user;
        const createdGroup = await this.create(newGroup);

  // Return only the id, name, and type of the created group
  return {
    id: createdGroup.id,
    name: createdGroup.name,
    type: createdGroup.type,
  };

    
}

    async joinGroupByCode(code: string, user: UserEntity): Promise<Partial<GroupEntity>>{
      console.log(user)
      const group = await this.groupsRepository.createQueryBuilder('group')
      .leftJoinAndSelect('group.members', 'members')
      .where('groupCode = :code', { code: code})
      .getOne();
      if (!group){
        throw new NotFoundException('Please check group credentials')
      }
      else{
        console.log(group)
      group.members.push(user);
      const joinedGroup = await this.groupsRepository.save(group)
      return {
        id: joinedGroup.id,
        name: joinedGroup.name,
        type: joinedGroup.type,
      };
    }
  }

  async joinPublicGroup(id: number, user: UserEntity): Promise<Partial<GroupEntity>>{
    console.log(user)
    const group = await this.groupsRepository.createQueryBuilder('group')
    .leftJoinAndSelect('group.members', 'members')
    .where('group.id = :id', { id: id})
    .getOne();
    if (!group){
      throw new NotFoundException('Please check group credentials')
    }
    else{
    group.members.push(user);
    const joinedGroup = await this.groupsRepository.save(group)
    return {
      id: joinedGroup.id,
      name: joinedGroup.name,
      type: joinedGroup.type,
    };
  }
}


  async updateGroup(id: number , updateGroupDto: UpdateGroupDto, user: UserEntity): Promise<GroupEntity>{
    
    const updatedGroup = await this.groupsRepository.preload({
      id,
      ...updateGroupDto,
    });
    if (! updatedGroup){
      throw new NotFoundException(`Group of ${id} does not exist`);

    }

    const GroupOwner = await this. getGroupOwner(updatedGroup.id)
    if (!this.userService.isOwnerOrAdmin(GroupOwner,user)){
      throw new UnauthorizedException()
    
    }
    else{
      // Remove existing tags from the group's tag collection
    updatedGroup.tags = [];

    // Add new tags provided in the updateGroupDto
    for (const tag of updateGroupDto.tags) {
        const newtag = await this.tagService.addNewTagIfNotExists(tag.value);
        updatedGroup.tags.push(newtag);
    }
    return await this.groupsRepository.save(updatedGroup)
     
    }
  }

  async getGroupMembers(groupId: number): Promise<UserEntity[]> {
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
      relations: ['members', 'owner'],
    });

    if (!group) {
      throw new Error('Group not found');
    }

    return group.members;
  }

// Retrive the Group Owner
  async getGroupOwner(groupId: number): Promise<UserEntity> {
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
      relations: ['owner']
    });
  
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found.`);
    }
  
    return group.owner;
  }


 // retrieve all tasks associated with a particular group.
async getTasksOfGroup(groupId: number): Promise<TaskEntity[]> {
  const groupWithTasks = await this.groupsRepository.findOne({
    where: { id: groupId },
    relations: ['tasks']
  });

  if (!groupWithTasks) {
    throw new NotFoundException(`Group with ID ${groupId} not found.`);
  }

  return groupWithTasks.tasks;
}

//retrieve all resources associated with a particular group.
async getResourcesOfGroup(groupId: number): Promise<ResourceEntity[]> {
  const groupWithResources = await this.groupsRepository.findOne({
    where: { id: groupId },
    relations: ['resources']
  });

  if (!groupWithResources) {
    throw new NotFoundException(`Group with ID ${groupId} not found.`);
  }

  return groupWithResources.resources;
}


 async findAllGroups(user: UserEntity): Promise<GroupEntity[]>{
  if (user.role === UserRoleEnum.ADMIN) {
    // If the user is an admin, return all groups
    return await this.groupsRepository.find();
} else {
    
  return await this.groupsRepository.createQueryBuilder('group')
  .leftJoin('group.owner', 'owner')
  .leftJoin('group.members', 'member')
  .where('owner.id = :userId OR member.id = :userId', { userId: user.id })
  .getMany();
}
 }
  
 async findById(id: number, user: UserEntity): Promise<GroupEntity> {
  // Retrieve the group entity by ID
  const group = await this.groupsRepository.findOne({
    where: {id}, 
        });

  if (!group) {
      // If the group with the specified ID does not exist, throw a NotFoundException
      throw new NotFoundException(`Group with ID ${id} does not exist`);
  }

  // if (this.userService.isOwnerOrAdmin(group.owner, user)) {
  //     // If the user is an admin, or the user is the owner or a member of the group, return the group
      return group;
  // } else {
      // If the user does not have permission to access the group, throw an UnauthorizedException
      // throw new UnauthorizedException(`User does not have permission to access group with ID ${id}`);
  // }
}

async softDeleteGroup(id: number, user: UserEntity){

  const group = await this.groupsRepository.findOne({
    where: {id}});
    if (!group){
      throw new NotFoundException('');
    }

    if (this.userService.isOwnerOrAdmin(group.owner, user))
      return this.groupsRepository.softDelete(id);
    else
      throw new UnauthorizedException('');

}

async restoreGroup(id: number, user: UserEntity){

  const group = await this.groupsRepository.query("SELECT * FROM `group` WHERE id = ?", [id]);
  console.log(group)

  if (!group) {
    throw new NotFoundException('');
  }

  console.log(typeof group[0].ownerId)
  console.log(typeof user.id)

  if (user.role === UserRoleEnum.ADMIN || (group[0].ownerId && group[0].ownerId === user.id))
    {
      return this.groupsRepository.restore(id);
    }
  else
  {throw new UnauthorizedException('');}

}

 async leaveGroup(id: number, user: UserEntity){
  const group = await this.groupsRepository.createQueryBuilder('group')
      .leftJoinAndSelect('group.members', 'members')
      .leftJoinAndSelect('group.owner', 'owner')
      .where('group.id = :id', { id: id})
      .getOne();
    console.log('this is the group',group)
    if (!group){
      throw new NotFoundException('');
    }

    if(this.userService.isOwnerOrAdmin(group.owner, user))
    
    { await this.groupsRepository.softDelete(id);
      return true  
    }
    
    else if (group.members.some(member => member.id === user.id)){

      group.members = group.members.filter(member => member.id !== user.id);

      await this.groupsRepository.save(group);
      return true
      
    }
    else {
      throw new UnauthorizedException('User does not belong to the group')
    }
    
 }

 async getPublicGroupsWhereUserNotPartOf(user: UserEntity): Promise<GroupEntity[]> {
  const query = this.groupsRepository
    .createQueryBuilder('group')
    .leftJoinAndSelect('group.tags', 'tags')
    .leftJoin('group.owner', 'owner')
    .leftJoin('group.members', 'member')
    .where('group.type = :type', { type: 'Public' })
    .andWhere('owner.id != :userId OR member.id != :userId', { userId: user.id })
  return await query.getMany();
 
}

  async getAllGroupCommunityUsernames(id : number): Promise<string[]>{

      // Retrieve the group entity with its owner and members
    const group = await this.groupsRepository
    .createQueryBuilder('group')
    .leftJoinAndSelect('group.owner', 'owner')
    .leftJoinAndSelect('group.members', 'member')
    .where('group.id = :id', { id })
    .getOne();

  if (!group) {
    throw new NotFoundException(`Group with ID ${id} not found.`);
  }

  // Extract usernames from the owner and members
  const usernames = [group.owner.username, ...group.members.map(member => member.username)];

  return usernames;

  }

  

}
