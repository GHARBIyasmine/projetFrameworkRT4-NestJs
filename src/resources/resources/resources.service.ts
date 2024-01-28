import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceEntity } from './entities/resources.entity';
import { CrudService } from 'src/common/crud/crud.service';

@Injectable()
export class ResourcesService extends CrudService<ResourceEntity> {
  constructor(
    @InjectRepository(ResourceEntity)
    private resourcesRepository: Repository<ResourceEntity>,
  ) {
    super(resourcesRepository);
  }



}
