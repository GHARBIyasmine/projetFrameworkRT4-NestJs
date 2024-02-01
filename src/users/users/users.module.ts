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
<<<<<<< HEAD
  controllers: [UsersController],
  exports :[UsersService]
=======
  controllers: [UsersController]
>>>>>>> b55e49b3cfe16d3932d9b75b56e08d210d40075e
})
export class UsersModule {}
