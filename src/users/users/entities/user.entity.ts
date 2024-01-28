import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { TaskEntity } from 'src/tasks/tasks/entities/tasks.entity';
import { ResourceEntity } from 'src/resources/resources/entities/resources.entity';
import { Timestampentity} from  'src/Generics/timestampentity'
@Entity('user')
export class UserEntity extends Timestampentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; 
  
  @Column()
  email: string;



  @OneToMany(() => GroupEntity, group => group.owner)
  ownedGroups: GroupEntity[];

  @ManyToMany(() => GroupEntity, group => group.members)
  @JoinTable()
  memberOfGroups: GroupEntity[];

  @OneToMany(() => TaskEntity, task => task.createdBy)
  createdTasks: TaskEntity[];

  @OneToMany(() => TaskEntity, task => task.assignedTo)
  assignedTasks: TaskEntity[];

  @OneToMany(() => ResourceEntity, resource => resource.uploadedBy)
  uploadedResources: ResourceEntity[];
}
