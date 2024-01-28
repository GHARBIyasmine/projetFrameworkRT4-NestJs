import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { NotificationEntity } from './notifications.entity';
import { TaskEntity } from 'src/tasks/tasks/entities/tasks.entity';

@Entity('deadline_notif')

export class DeadlineNotifEntity extends NotificationEntity {
  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;
}
