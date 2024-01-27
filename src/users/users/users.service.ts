import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService extends CrudService<UserEntity>{
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
      ) {
        super(usersRepository);
      }

      async findUserOwnedGroups(userId: number) {
        const user = await this.usersRepository.findOne({
          where: { id: userId },
          relations: ['ownedGroups'], 
          select: ['ownedGroups'],
        });
    
        return user?.ownedGroups;
      }


}
