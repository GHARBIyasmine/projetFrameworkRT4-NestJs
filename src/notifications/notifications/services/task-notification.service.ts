import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewTaskNotif } from '../entities/new-task-notif.entity';


@Injectable()
export class TaskNotificationService {
    constructor(
        @InjectRepository(NewTaskNotif)
        private taskNotificationRepository: Repository<NewTaskNotif>,
      ) {}

    }
