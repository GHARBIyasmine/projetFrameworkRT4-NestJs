import { Controller, Get, Post, Body, Param, Delete, Put,Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }


  @Get(':id/duedate')
  async getTaskDueDate(@Param('id') taskId: number): Promise<Date | null> {
    try {
      return await this.tasksService.findTaskDueDate(taskId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  findTaskById(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Get()
  findAllTasks() {
    return this.tasksService.findAll();
  }

  
  @Put(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
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
