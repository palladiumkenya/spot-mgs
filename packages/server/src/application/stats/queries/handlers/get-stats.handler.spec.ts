import { QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { MasterFacility } from '../../../../domain/master-facility.entity';
import { Facility } from '../../../../domain/facility.entity';
import { StatsModule } from '../../stats.module';
import { GetStatsHandler } from './get-stats.handler';
import { GetStatsQuery } from '../get-stats-query';
import { StatsDto } from '../../../../domain/dtos/stats.dto';
import { getManager } from 'typeorm';
import {
    getTestFacilities,
    getTestMasterFacilities,
} from '../../../../../test/test.data';

describe('Get Stats Test', () => {
    let module: TestingModule;
    let queryBus: QueryBus;
    jest.setTimeout(30000);

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRootAsync({
                    useFactory: () => ({
                        type: 'sqlite',
                        database: ':memory:',
                        entities: [MasterFacility, Facility],
                        dropSchema: true,
                        synchronize: true,
                        logging: false,
                    }),
                }),
                StatsModule,
            ],
        }).compile();

        const mfData = await getTestMasterFacilities();
        const fData = await getTestFacilities();
        const entityManager = getManager();
        for (const mf of mfData) {
            await entityManager.save(mf);
        }
        for (const f of fData) {
            await entityManager.save(f);
        }
        const handler = module.get<GetStatsHandler>(GetStatsHandler);
        queryBus = module.get<QueryBus>(QueryBus);
        queryBus.bind(handler, GetStatsQuery.name);
    });

    it('should get uploads', async () => {
        const query = new GetStatsQuery();
        const result = await queryBus.execute<GetStatsQuery, StatsDto>(query);
        expect(result.migrated.length).toBeGreaterThan(0);
        expect(result.nonMigrated.length).toBeGreaterThan(0);
        expect(result.totalNonMigrated).toBeGreaterThan(0);
        expect(result.totalMigrated).toBeGreaterThan(0);
        expect(result.migrationProgress).toBeGreaterThan(0);
        Logger.debug(result);
    });
});
