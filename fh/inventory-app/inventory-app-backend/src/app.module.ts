import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [CommonModule, InventoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
