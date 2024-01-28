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
      relations: ['createdBy'], // Load the createdBy relationship
      select: ['createdBy'], // Select only the createdBy property
    });

    return task?.createdBy;
  }

  async findTaskDueDate(taskId: number): Promise<Date | null> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      select: ['dueDate'] // Select only the dueDate property
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    return task.dueDate;
  }

  async findTaskGroup(taskId: number): Promise<GroupEntity | undefined> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['group'], // Load the group relationship
      select: ['group'], // Select only the group property
    });

    return task?.group;
  }



  
}
