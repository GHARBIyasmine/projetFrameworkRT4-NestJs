import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { NewResourceNotifEntity } from 'src/notifications/notifications/entities/new-resource-notif.entity';
import { Timestampentity} from  'src/Generics/timestampentity'

@Entity('resource')
export class ResourceEntity extends  Timestampentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string; 


  @ManyToOne(() => UserEntity, user => user.uploadedResources)
  uploadedBy: UserEntity;

  @ManyToOne(() => GroupEntity, group => group.resources)
  group: GroupEntity;

  @OneToMany(() => NewResourceNotifEntity, newResourceNotif => newResourceNotif.resource)
  newResourceNotifications: NewResourceNotifEntity[];
}
