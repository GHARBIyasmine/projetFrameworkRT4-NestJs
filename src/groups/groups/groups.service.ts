import { Injectable, NotFoundException } from '@nestjs/common';
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


@Injectable()
export class GroupsService extends CrudService<GroupEntity> {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupsRepository: Repository<GroupEntity>,
    private readonly tagService: TagService 

  ) {
    super(groupsRepository);
  }

  async createNewGroup(newGroupDto: CreateGroupDto, user: UserEntity): Promise<GroupEntity> {
    // Array to store promises for each addNewTagIfNotExists call
    const tagPromises: Promise<TagEntity>[] = [];

    // Iterate over each tag in newGroupDto
    newGroupDto.tags.forEach(tagEntity => {
        // Add the asynchronous operation to the array of promises
        tagPromises.push(this.tagService.addNewTagIfNotExists(tagEntity.value));
    });

        // Wait for all addNewTagIfNotExists calls to complete
        const tags = await Promise.all(tagPromises);

        // Assign the retrieved or created tags to newGroupDto
        newGroupDto.tags = tags;

        // Create the new group entity
        const newGroup = this.groupsRepository.create(newGroupDto);
        newGroup.owner = user;

        // Save the new group entity
        return await this.create(newGroup);
    
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


}
