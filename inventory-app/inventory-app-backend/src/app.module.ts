import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { InventoryModule } from './inventory/inventory.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CommonModule, InventoryModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
