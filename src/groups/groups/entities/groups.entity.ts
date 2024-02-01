import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/users/users/entities/user.entity';
import { TaskEntity } from 'src/tasks/tasks/entities/tasks.entity';
import { ResourceEntity } from 'src/resources/resources/entities/resources.entity';
import { NotificationEntity } from 'src/notifications/notifications/entities/notifications.entity';
import { Timestampentity} from  'src/Generics/timestampentity'
import { ResourcesService } from 'src/resources/resources/resources.service';
import { GroupType } from './group-type.enum';
import { TagEntity } from 'src/tag/entities/tag.entity';


@Entity('group')
export class GroupEntity extends Timestampentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: GroupType, default: GroupType.PRIVATE })
  type: GroupType;

  @Column({ length: 20, unique:true})
  groupCode: string


  @ManyToMany(
    () => TagEntity,
    tag => tag.groups,
    {
      cascade: ['insert','update'],
      nullable: true,
      eager: true
    }
    )
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(
    () => UserEntity,
    user => user.ownedGroups,
    {
      cascade: ['update'],
      nullable: false,
    })
    @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @ManyToMany(
    () => UserEntity,
    user => user.memberOfGroups,
    {
      cascade: ['insert','update'],
      nullable: true,
    })
    @JoinTable()
  members: UserEntity[];

  @OneToMany(
    () => TaskEntity,
    task => task.group,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      eager: true
    })
  tasks: TaskEntity[];

  @OneToMany(() => ResourceEntity, resource => resource.group)
  resources: ResourceEntity[];

  @OneToMany(() => NotificationEntity, notification => notification.group)
  notifications: NotificationEntity[];
}
