
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate} from 'typeorm';
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { TaskEntity } from 'src/tasks/tasks/entities/tasks.entity';
import { ResourceEntity } from 'src/resources/resources/entities/resources.entity';
import { Timestampentity} from  'src/Generics/timestampentity'
import { UserRoleEnum } from './user-role.enum';
@Entity('user')
export class UserEntity extends Timestampentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;


  
  @Column({ unique: true })
  email: string;

  @Column()
  salt: string 

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER
  })
  role: string


  @Column()
  password: string; 

  @Column({ type: 'blob', nullable: true })
  profileImage: Buffer;
  
  
  
  @BeforeInsert()
  @BeforeUpdate()
  emailAndUsernameToLowerCase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }


  @OneToMany(
    () => GroupEntity,
    group => group.owner,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      // eager: true
    })
  ownedGroups: GroupEntity[];

  @ManyToMany(
    () => GroupEntity,
    group => group.members,
    {
      cascade: ['insert','update'],
      nullable: true,
      // eager: true
    })
  memberOfGroups: GroupEntity[];

  @OneToMany(
    () => TaskEntity,
    task => task.createdBy,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      
    })
  createdTasks: TaskEntity[];

  @OneToMany(
    () => TaskEntity,
    task => task.assignedTo,
    {
      cascade: ['insert', 'update'],
      nullable: true,
    })
  assignedTasks: TaskEntity[];

  @OneToMany(() => ResourceEntity, resource => resource.uploadedBy)
  uploadedResources: ResourceEntity[];

  
}
