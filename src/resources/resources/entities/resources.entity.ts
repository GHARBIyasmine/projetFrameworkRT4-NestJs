import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/users/entities/user.entity';
import { Group } from 'src/groups/groups/entities/groups.entity';
import { NewResourceNotif } from 'src/notifications/notifications/entities/new-resource-notif.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string; 


  @ManyToOne(() => User, user => user.uploadedResources)
  uploadedBy: User;

  @ManyToOne(() => Group, group => group.resources)
  group: Group;

  @OneToMany(() => NewResourceNotif, newResourceNotif => newResourceNotif.resource)
  newResourceNotifications: NewResourceNotif[];
}
