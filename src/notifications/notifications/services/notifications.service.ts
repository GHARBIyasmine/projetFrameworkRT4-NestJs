import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service'; 
import { Notification } from '../entities/notifications.entity'; 

@Injectable()
export class NotificationService extends CrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>
  ) {
    super(notificationRepository);
  }

  // Mark a notification as read
  async markNotificationAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found.`);
    }
    notification.state = true; // true indicates a read notification
    return this.notificationRepository.save(notification);
  }



}
