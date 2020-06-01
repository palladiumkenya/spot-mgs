import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetStatsHandler } from './queries/handlers/get-stats.handler';
import { ConfigModule } from '../../config/config.module';
import { Facility } from '../../domain/facility.entity';
import { MasterFacility } from '../../domain/master-facility.entity';
import { StatsController } from './controllers/stats.controller';

@Module({
    imports: [
        ConfigModule,
        CqrsModule,
        TypeOrmModule.forFeature([Facility, MasterFacility]),
    ],
    // @ts-ignore
    providers: [GetStatsHandler],
    controllers: [StatsController],
})
export class StatsModule {}
