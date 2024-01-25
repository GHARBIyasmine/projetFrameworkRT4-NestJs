import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/tasks/entities/tasks.entity';
import { CrudService } from 'src/common/crud/crud.service';
import { TaskStatus } from './entities/task-status.enum';
import { User } from 'src/users/users/entities/user.entity';
import { NotificationService } from 'src/notifications/notifications/services/notifications.service';
import { Group } from 'src/groups/groups/entities/groups.entity';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService extends CrudService<Task> {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private notificationService: NotificationService,
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {
    super(tasksRepository);
  }


  async findTasksByStatus(status: TaskStatus): Promise<Task[]> {
    return this.tasksRepository.find({ where: { status } });
  }

  async findTaskCreator(taskId: number): Promise<User | undefined> {
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



  
}
