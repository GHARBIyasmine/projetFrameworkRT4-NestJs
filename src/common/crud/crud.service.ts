import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { HasId } from './has-id';

export class CrudService<T extends HasId> {
  constructor(private repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    return await this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id:number) {
    const findOneOptions: FindOneOptions = {
        where: { id: id }, 
      }
    return this.repository.findOne(findOneOptions);
  }

  async update(id: number, updateEntity: DeepPartial<T>):Promise<T> {
  
      const existingEntity = await this.repository.preload({
        id,
        ...updateEntity
      });
      if (!existingEntity) {
        throw new NotFoundException(`The entity of ID ${id} is not found.`);
      }
      
      return await this.repository.save(existingEntity);
   }

   async remove(id: number): Promise<DeleteResult> {
    const findOneOptions: FindOneOptions = {
      where: { id: id }, 
    }
    const existingEntity = await this.repository.findOne(findOneOptions);
    if (!existingEntity) {
      throw new NotFoundException(`The Todo of ID ${id} is not found.`);
    }
   return await this.repository.delete(id);
}
  }
