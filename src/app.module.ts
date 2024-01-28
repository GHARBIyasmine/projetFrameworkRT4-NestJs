import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/users/entities/user.entity';
import { GroupEntity } from './groups/groups/entities/groups.entity';
import { TaskEntity } from './tasks/tasks/entities/tasks.entity';
import { ResourceEntity } from './resources/resources/entities/resources.entity';
import { NotificationEntity } from './notifications/notifications/entities/notifications.entity';
import { NewMemberNotifEntity } from './notifications/notifications/entities/new-member-notif.entity';
import { NewResourceNotifEntity } from './notifications/notifications/entities/new-resource-notif.entity';
import { NewTaskNotifEntity } from './notifications/notifications/entities/new-task-notif.entity';
import { DeadlineNotifEntity} from './notifications/notifications/entities/deadline-notif.entity';
import { UsersModule } from './users/users/users.module';
import { GroupsModule } from './groups/groups/groups.module';
import { TasksModule } from './tasks/tasks/tasks.module';
import { ResourcesModule } from './resources/resources/resources.module';
import { NotificationsModule } from './notifications/notifications/notifications.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      
    }),
    CommonModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({

        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity , GroupEntity, TaskEntity, ResourceEntity, NotificationEntity,NewMemberNotifEntity,NewResourceNotifEntity,NewTaskNotifEntity,DeadlineNotifEntity
    ]), 
     
    UsersModule,
    GroupsModule,
    TasksModule,
    TagModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
