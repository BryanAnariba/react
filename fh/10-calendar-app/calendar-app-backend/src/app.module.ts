import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ModulesModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
