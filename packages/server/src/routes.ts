import { Routes } from 'nest-router';
import { StatsModule } from './application/stats/stats.module';

export const routes: Routes = [
    {
        path: 'api/v1/stats',
        module: StatsModule,
    },
];
