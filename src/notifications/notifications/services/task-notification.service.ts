import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewTaskNotifEntity } from '../entities/new-task-notif.entity';
import { GroupsService } from 'src/groups/groups/groups.service';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class TaskNotificationService {
    constructor(
        @InjectRepository(NewTaskNotifEntity)
        private taskNotificationRepository: Repository<NewTaskNotifEntity>,
        private groupsService: GroupsService,
      ) {}


      async createNewTaskNotification(groupId: number, taskId: number): Promise<NewTaskNotifEntity> {
        const group = await this.groupsService.findOne(groupId);
        if (!group) {
          throw new NotFoundException(`Group with ID ${groupId} not found.`);
        }
      
        const newTaskNotification = new NewTaskNotifEntity();
        newTaskNotification.group.owner = group.owner;
        newTaskNotification.date = new Date();
        newTaskNotification.state = false; 
      
        return this.taskNotificationRepository.save(newTaskNotification);
      }

    }
