import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [CoreModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
