import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Notification } from './notifications.entity';
import { Resource } from 'src/resources/resources/entities/resources.entity'; 

@Entity()
export class NewResourceNotif extends Notification {
  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resourceId' })
  resource: Resource;
}
