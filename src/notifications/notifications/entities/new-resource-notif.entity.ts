import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { NotificationEntity } from './notifications.entity';
import { ResourceEntity } from 'src/resources/resources/entities/resources.entity'; 

@Entity('new_resource_notif')
export class NewResourceNotifEntity extends NotificationEntity {
    
  @ManyToOne(() => ResourceEntity)
  @JoinColumn({ name: 'resourceId' })
  resource: ResourceEntity;
}
