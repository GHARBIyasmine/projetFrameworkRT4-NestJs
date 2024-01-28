import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { CrudService } from 'src/common/crud/crud.service';
import { NotificationService } from 'src/notifications/notifications/services/notifications.service';
import { TaskEntity } from 'src/tasks/tasks/entities/tasks.entity';
import { ResourceEntity } from 'src/resources/resources/entities/resources.entity';


@Injectable()
export class GroupsService extends CrudService<GroupEntity> {
  constructor(
    @InjectRepository(GroupEntity)
    private groupsRepository: Repository<GroupEntity>,
  ) {
    super(groupsRepository);
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
