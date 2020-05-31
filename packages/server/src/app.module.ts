import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { StatsModule } from './application/stats/stats.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [DatabaseModule, ConfigModule, StatsModule, CqrsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
