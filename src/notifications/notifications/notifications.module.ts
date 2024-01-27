import { Module } from '@nestjs/common';
import { NotificationService } from './services/notifications.service';
import { NotificationController } from './notifications.controller';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationsModule {}
