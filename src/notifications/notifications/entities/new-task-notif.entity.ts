import { Column, Entity,ManyToOne, JoinColumn } from 'typeorm';
import { NotificationEntity } from './notifications.entity';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { TaskEntity } from 'src/tasks/tasks/entities/tasks.entity'; 

@Entity('new_task_notif')
export class NewTaskNotifEntity extends NotificationEntity {

  @Column()
  taskDescription: string;


  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;


}

