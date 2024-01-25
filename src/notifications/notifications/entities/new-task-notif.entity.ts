import { Column, Entity,ManyToOne, JoinColumn } from 'typeorm';
import { Notification } from './notifications.entity';
import { User } from 'src/users/users/entities/user.entity';
import { Task } from 'src/tasks/tasks/entities/tasks.entity'; 

@Entity()
export class NewTaskNotif extends Notification {
  @ManyToOne(() => Task)
  @JoinColumn({ name: 'taskId' })
  task: Task;
}

