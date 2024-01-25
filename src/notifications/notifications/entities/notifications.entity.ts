import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn  } from 'typeorm'; 
import { Group } from 'src/groups/groups/entities/groups.entity';
import { HasId } from 'src/common/crud/has-id';


@Entity()
export class Notification  implements HasId {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @Column()
  date: Date;

  @Column({ default: false })
  state: boolean; // false for unread, true for read
}



