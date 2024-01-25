import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/groups/entities/groups.entity';
import { User } from 'src/users/users/entities/user.entity';
import { CrudService } from 'src/common/crud/crud.service';
import { NotificationService } from 'src/notifications/notifications/services/notifications.service';
import { Task } from 'src/tasks/tasks/entities/tasks.entity';
import { Resource } from 'src/resources/resources/entities/resources.entity';


@Injectable()
export class GroupsService extends CrudService<Group> {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private notificationService: NotificationService
  ) {
    super(groupsRepository);
  }

  async getGroupMembers(groupId: number): Promise<User[]> {
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
  async getGroupOwner(groupId: number): Promise<User> {
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
async getTasksOfGroup(groupId: number): Promise<Task[]> {
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
async getResourcesOfGroup(groupId: number): Promise<Resource[]> {
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
