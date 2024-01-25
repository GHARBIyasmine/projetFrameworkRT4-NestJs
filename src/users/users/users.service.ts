import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends CrudService<User>{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {
        super(usersRepository);
      }


}
