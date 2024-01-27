import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service'; 
import { NotificationEntity } from '../entities/notifications.entity'; 

@Injectable()
export class NotificationService extends CrudService<NotificationEntity> {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>
  ) {
    super(notificationRepository);
  }

  // Mark a notification as read
  async markNotificationAsRead(id: number): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found.`);
    }
    notification.state = true; // true indicates a read notification
    return this.notificationRepository.save(notification);
  }



}
