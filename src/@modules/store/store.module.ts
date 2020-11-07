import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles';
import { BrandsModule } from './brands';
@Module({
    imports: [ArticlesModule, BrandsModule]
})

export class StoreModule  {}