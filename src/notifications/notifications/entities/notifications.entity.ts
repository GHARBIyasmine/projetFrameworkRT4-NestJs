import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn  } from 'typeorm'; 
import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { HasId } from 'src/common/crud/has-id';
import { Timestampentity} from  'src/Generics/timestampentity'


@Entity('notification')
export class NotificationEntity  extends Timestampentity implements HasId {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GroupEntity)
  @JoinColumn({ name: 'groupId' })
  group: GroupEntity;

  @Column()
  date: Date;

  @Column({ default: false })
  state: boolean; // false for unread, true for read
}



