import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UserEntity} from './entities/user.entity';

import { AuthModule } from 'src/auth/auth.module';
import { DtoHelperService } from './dto/dto-helper.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  AuthModule,
],
  providers: [UsersService, DtoHelperService, JwtStrategy],
  controllers: [UsersController],
  exports :[UsersService]
})
export class UsersModule {}
