import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CrudService } from 'src/common/crud/crud.service';
import { TagEntity } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService extends CrudService<TagEntity>{

  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {
    super(tagRepository);
  }
 
  async addNewTagIfNotExists(tagValue: string ): Promise<TagEntity>{
  const existingTag = await this.tagRepository.findOne({
    where: { value: tagValue }
  });

  // If the tag doesn't exist, create a new one and save it to the database
  if (!existingTag) {
    const newTag = this.tagRepository.create({ value: tagValue });
    return await this.tagRepository.save(newTag);
  }

    // If the tag already exists, return it
    return existingTag;

  }
}
