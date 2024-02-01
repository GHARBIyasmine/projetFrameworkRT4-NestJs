import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service'; 
import { NewMemberNotifEntity } from '../entities/new-member-notif.entity'; 
import { GroupsService } from 'src/groups/groups/groups.service';
import { UsersService } from 'src/users/users/users.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class NewMemberNotifService extends CrudService<NewMemberNotifEntity> {
  constructor(
    @InjectRepository(NewMemberNotifEntity)
    private newMemberNotifRepository: Repository<NewMemberNotifEntity>,
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {
    super(newMemberNotifRepository);
  }


  async createNewMemberNotification(groupId: number, newMemberName: string): Promise<NewMemberNotifEntity> {
    const group = await this.groupsService.findOne(groupId);
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found.`);
    }
  
    const newMemberNotification = new NewMemberNotifEntity();
    newMemberNotification.group.owner = group.owner;
    newMemberNotification.newMemberName = newMemberName; 
    newMemberNotification.date = new Date();
    newMemberNotification.state = false; 
  
    return this.newMemberNotifRepository.save(newMemberNotification);
  }
 
}
