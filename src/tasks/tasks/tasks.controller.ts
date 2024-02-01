import { Controller, Get, Post, Body, Param, Delete, Put,Query, ParseIntPipe, NotFoundException, UseGuards, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/task-status.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { User } from 'src/decorators/user.decorators';
import { TaskEntity } from './entities/tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create/:id')
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTaskDto: CreateTaskDto,
    @User() user : UserEntity): Promise<Partial<TaskEntity>> {
    return this.tasksService.createTask(createTaskDto, user,id);
  }

  @Get('all/:id')
  @UseGuards(JwtAuthGuard)
  async getAllTaskByGroup(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Partial<TaskEntity[]>>{
    return this.tasksService.getAllTaskByGroup(id)
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto:UpdateTaskDto
  ): Promise<Partial<TaskEntity>>{
    return this.tasksService.updateTask(updateTaskDto, id)
  }


  @Get(':id/duedate')
  async getTaskDueDate(@Param('id') taskId: number): Promise<Date | null> {
    try {
      return await this.tasksService.findTaskDueDate(taskId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  @Get('details/:userId')
  async getAllTasksByUser(@Param('userId') userId: number) {
    return this.tasksService.findTasksByUser(userId);
  }

  @Get(':id')
  findTaskById(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Get()
  findAllTasks() {
    return this.tasksService.findAll();
  }

 
  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }

  @Get('status')
  findTasksByStatus(@Query('status') status: TaskStatus) {
    return this.tasksService.findTasksByStatus(status);
  }


  

}
