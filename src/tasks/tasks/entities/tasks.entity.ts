import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/users/entities/user.entity';
import { Group } from 'src/groups/groups/entities/groups.entity';
import { TaskStatus } from './task-status.enum';
import { NewTaskNotif } from 'src/notifications/notifications/entities/new-task-notif.entity';
import { DeadlineNotif } from 'src/notifications/notifications/entities/deadline-notif.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO
  })
  status: TaskStatus;


  @Column({ type: 'date', nullable: true })
  dueDate: Date | null;

  @ManyToOne(() => User, user => user.createdTasks)
  createdBy: User;

  @ManyToOne(() => User, user => user.assignedTasks, { nullable: true })
  assignedTo: User | null;

  @ManyToOne(() => Group, group => group.tasks)
  group: Group;

  @OneToMany(() => NewTaskNotif, newTaskNotif => newTaskNotif.task)
  newTaskNotifications: NewTaskNotif[];

  @OneToMany(() => DeadlineNotif, deadlineNotif => deadlineNotif.task)
  deadlineNotifications: DeadlineNotif[];
}
