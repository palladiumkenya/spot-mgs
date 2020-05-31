import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetStatsQuery } from '../get-stats-query';
import { Facility } from '../../../../domain/facility.entity';
import { StatsDto } from '../../../../domain/dtos/stats.dto';

@QueryHandler(GetStatsQuery)
export class GetStatsHandler implements IQueryHandler<GetStatsQuery, any> {
    constructor(
        @InjectRepository(Facility)
        private readonly repository: Repository<Facility>,
    ) {}

    async execute(query: GetStatsQuery): Promise<any> {
        const nonMigratedSql =
            'select mf.County,f.*\n' +
            'from Facility f inner join MasterFacility mf on f.Code=mf.Code\n' +
            "where f.Emr='IQCare' and f.SnapshotDate is null";

        const nonMigrated = await this.repository.query(nonMigratedSql);

        const migratedSql =
            'select mf.County,f.*\n' +
            'from Facility f inner join MasterFacility mf on f.SnapshotSiteCode=mf.Code\n' +
            "where f.Emr='IQCare' and f.SnapshotVersion is not null";

        const migrated = await this.repository.query(migratedSql);

        const statsDto = new StatsDto(nonMigrated, migrated);
        return statsDto;
    }
}
