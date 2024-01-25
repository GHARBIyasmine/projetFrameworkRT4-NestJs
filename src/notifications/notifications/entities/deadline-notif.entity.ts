import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Notification } from './notifications.entity';
import { Task } from 'src/tasks/tasks/entities/tasks.entity';

@Entity()
export class DeadlineNotif extends Notification {
  @ManyToOne(() => Task)
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
