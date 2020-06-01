import { StatsTileDto } from './stats-tile.dto';

export class StatsDto {
    tile: StatsTileDto;
    migrated: any;
    nonMigrated: any;

    constructor(nonMigrated: any, migrated: any) {
        this.nonMigrated = nonMigrated;
        this.migrated = migrated;
        this.updateTile();
    }

    updateTile() {
        const mgs = this.migrated ? this.migrated.length : 0;
        const nonMgs = this.nonMigrated ? this.nonMigrated.length : 0;
        this.tile = new StatsTileDto(mgs, nonMgs);
    }
}
