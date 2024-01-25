import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service'; 
import { NewMemberNotif } from '../entities/new-member-notif.entity'; 
import { GroupsService } from 'src/groups/groups/groups.service';
import { UsersService } from 'src/users/users/users.service';

@Injectable()
export class NewMemberNotifService extends CrudService<NewMemberNotif> {
  constructor(
    @InjectRepository(NewMemberNotif)
    private newMemberNotifRepository: Repository<NewMemberNotif>,
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {
    super(newMemberNotifRepository);
  }


  async createNewMemberNotification(groupId: number, newMemberId: number): Promise<NewMemberNotif> {
    const group = await this.groupsService.findOne(groupId);
    const newMember = await this.usersService.findOne(newMemberId);

    const newMemberNotification = new NewMemberNotif();
    newMemberNotification.group = group;
    newMemberNotification.date = new Date();
    newMemberNotification.state = false; 

    return this.newMemberNotifRepository.save(newMemberNotification);
  }
 
}
