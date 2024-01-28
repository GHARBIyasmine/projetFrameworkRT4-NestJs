import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UserEntity} from './entities/user.entity';
<<<<<<< HEAD

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
=======
import { AuthModule } from 'src/auth/auth.module';
import { DtoHelperService } from './dto/dto-helper.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  AuthModule,
],
  providers: [UsersService, DtoHelperService],
>>>>>>> d6c4ac98252d9a302c95b0b042b41914a7c303d0
  controllers: [UsersController]
})
export class UsersModule {}
