import { Entity, Column } from 'typeorm';
import { NotificationEntity } from './notifications.entity';


@Entity('new_member_notif')
export class NewMemberNotifEntity extends NotificationEntity {

    @Column()
  newMemberName: string;

}