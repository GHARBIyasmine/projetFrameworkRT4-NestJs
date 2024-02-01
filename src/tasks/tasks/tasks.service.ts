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
import { UsersService } from 'src/users/users/users.service';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService extends CrudService<TaskEntity> {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,

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

  
  async findTasksByUser(id: number):  Promise<TaskEntity[]> {
    return this.tasksRepository.find({
      where: { assignedTo : { id } },
      select : ['description','dueDate']
    });
  }

  async findTaskGroup(taskId: number): Promise<GroupEntity | undefined> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['group'], 
      select: ['group'], 
    });

    return task?.group;
  }


  async createTask(newTaskDto : CreateTaskDto, user: UserEntity, id: number): Promise<Partial<TaskEntity>>{
    const newTask = this.tasksRepository.create(newTaskDto)
    newTask.createdBy = user
    if(newTaskDto.assignee){
      newTask.assignedTo = await this.userService.findFullUserByUsername(newTaskDto.assignee) 
    }

    newTask.group = await this.groupRepository.findOneBy({id})
    const taskCreated = await this.create(newTask)
    return {
      id : taskCreated.id,
      description: taskCreated.description,
      assignedTo: taskCreated.assignedTo,
      dueDate: taskCreated.dueDate 

    } 

  }

  async updateTask(updateTaskDto : UpdateTaskDto, id: number):Promise<Partial<TaskEntity>>{
   
    const updatedTask = await this.tasksRepository.preload({
      id,
      ...updateTaskDto,
    });

    if(!updatedTask){
      throw new NotFoundException()
    }

    else{
      const savedTask = await this.create(updatedTask)
      return{
      id : savedTask.id,
      description: savedTask.description,
      assignedTo: savedTask.assignedTo,
      dueDate: savedTask.dueDate,
      status: savedTask.status
      }
    }
  }


  async getAllTaskByGroup(id: number): Promise<Partial<TaskEntity[]>> {
    const tasks = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoin('task.group', 'group')
      .leftJoinAndSelect('task.assignedTo', 'assignee')
      .select([
        'task.id',
        'task.description',
        'task.dueDate',
        'assignee.username',
        'task.status'
      ])
      .where('task.group.id = :id', { id })
      .getMany();

    return tasks;
  }

  
  
}
