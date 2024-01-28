<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate} from 'typeorm';
>>>>>>> d6c4ac98252d9a302c95b0b042b41914a7c303d0
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

<<<<<<< HEAD
  @Column()
  password: string; 
  
  @Column()
  email: string;


=======
  //
  @Column({ unique: true })
  email: string;


  @Column()
  password: string; // Consider storing hashed passwords only
  
  //
  @BeforeInsert()
  @BeforeUpdate()
  emailAndUsernameToLowerCase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }

>>>>>>> d6c4ac98252d9a302c95b0b042b41914a7c303d0

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
