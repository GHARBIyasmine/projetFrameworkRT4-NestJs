import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/tasks/tasks/entities/tasks.entity';
import { CrudService } from 'src/common/crud/crud.service';
import { TaskStatus } from './entities/task-status.enum';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { NotificationService } from 'src/notifications/notifications/services/notifications.service';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService extends CrudService<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {
    super(tasksRepository);
  }


  async findTasksByStatus(status: TaskStatus): Promise<TaskEntity[]> {
    return this.tasksRepository.find({ where: { status } });
  }

  async findTaskCreator(taskId: number): Promise<UserEntity | undefined> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['createdBy'], 
      select: ['createdBy'], 
    });

    return task?.createdBy;
  }

  async findTaskDueDate(taskId: number): Promise<Date | null> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      select: ['dueDate'] 
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    return task.dueDate;
  }

  async findTaskGroup(taskId: number): Promise<GroupEntity | undefined> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['group'], 
      select: ['group'], 
    });

    return task?.group;
  }



  
}
