import { Global, Module } from '@nestjs/common';
import { CrudService } from './crud/crud.service';

@Global()
@Module({
  providers: [CrudService]
})

export class CommonModule {}
