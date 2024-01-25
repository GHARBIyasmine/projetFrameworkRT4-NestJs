import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './services/notifications.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  getNotificationsForUser(@Param('userId') userId: number) {
    return this.notificationService.getNotificationsForUser(userId);
  }

  @Patch(':notificationId/read')
  markNotificationAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationService.markNotificationAsRead(notificationId);
  }
}
