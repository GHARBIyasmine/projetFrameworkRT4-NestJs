import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './services/notifications.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

 
}
