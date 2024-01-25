import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  findAllResources() {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  findResourceById(@Param('id') id: number) {
    return this.resourcesService.findOne(id);
  }

  @Put(':id')
  updateResource(@Param('id') id: number, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  deleteResource(@Param('id') id: number) {
    return this.resourcesService.remove(id);
  }
}
