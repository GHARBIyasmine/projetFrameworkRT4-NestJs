import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { TaskStatus } from './task-status.enum';
import { NewTaskNotifEntity } from 'src/notifications/notifications/entities/new-task-notif.entity';
import { DeadlineNotifEntity } from 'src/notifications/notifications/entities/deadline-notif.entity';
import { Timestampentity} from  'src/Generics/timestampentity'

@Entity('task')
export class TaskEntity extends Timestampentity{
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


  @Column({ type: 'date'})
  dueDate: Date ;

  @ManyToOne(
    () => UserEntity,
    user => user.createdTasks,
    {
      eager: true
    })
  createdBy: UserEntity;

  @ManyToOne(
    () => UserEntity,
    user => user.assignedTasks,
    { nullable: true,
    eager: true })
  assignedTo: UserEntity;

  @ManyToOne(
    () => GroupEntity,
    group => group.tasks,
    {
      cascade:['update'],
      onDelete : 'CASCADE'

    })
  group: GroupEntity;
  newTask: Promise<UserEntity>;

  // @OneToMany(() => NewTaskNotifEntity, newTaskNotif => newTaskNotif.task)
  // newTaskNotifications: NewTaskNotifEntity[];

  // @OneToMany(() => DeadlineNotifEntity, deadlineNotif => deadlineNotif.task)
  // deadlineNotifications: DeadlineNotifEntity[];
}
