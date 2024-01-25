import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { Group } from 'src/groups/groups/entities/groups.entity';
import { Task } from 'src/tasks/tasks/entities/tasks.entity';
import { Resource } from 'src/resources/resources/entities/resources.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // Consider storing hashed passwords only
  
  @Column()
  email: string;



  @OneToMany(() => Group, group => group.owner)
  ownedGroups: Group[];

  @ManyToMany(() => Group, group => group.members)
  @JoinTable()
  memberOfGroups: Group[];

  @OneToMany(() => Task, task => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => Task, task => task.assignedTo)
  assignedTasks: Task[];

  @OneToMany(() => Resource, resource => resource.uploadedBy)
  uploadedResources: Resource[];
}
