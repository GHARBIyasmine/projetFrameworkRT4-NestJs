import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/groups.entity';
import { TagModule } from 'src/tag/tag.module';
import { UsersModule } from 'src/users/users/users.module';
import { UsersService } from 'src/users/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity]),
  TagModule,
  UsersModule],
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: []
})
export class GroupsModule {
  
}
