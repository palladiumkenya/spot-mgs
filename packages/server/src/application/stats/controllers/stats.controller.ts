import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetStatsQuery } from '../queries/get-stats-query';

@Controller('stats')
export class StatsController {
    constructor(private readonly queryBus: QueryBus) {}

    @Get()
    async getStats(): Promise<any> {
        return this.queryBus.execute(new GetStatsQuery());
    }
}
