import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resources.entity';
import { CrudService } from 'src/common/crud/crud.service';

@Injectable()
export class ResourcesService extends CrudService<Resource> {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) {
    super(resourcesRepository);
  }



}
