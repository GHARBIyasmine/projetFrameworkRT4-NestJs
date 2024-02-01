import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/tasks.entity';
import { UsersModule } from 'src/users/users/users.module';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity,GroupEntity]),
  UsersModule],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
