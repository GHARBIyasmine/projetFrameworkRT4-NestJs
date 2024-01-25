import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/users/users/entities/user.entity';
import { Task } from 'src/tasks/tasks/entities/tasks.entity';
import { Resource } from 'src/resources/resources/entities/resources.entity';
import { Notification } from 'src/notifications/notifications/entities/notifications.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.ownedGroups)
  owner: User;

  @ManyToMany(() => User, user => user.memberOfGroups)
  members: User[];

  @OneToMany(() => Task, task => task.group)
  tasks: Task[];

  @OneToMany(() => Resource, resource => resource.group)
  resources: Resource[];

  @OneToMany(() => Notification, notification => notification.group)
  notifications: Notification[];
}
