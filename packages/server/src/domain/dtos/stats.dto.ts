export class StatsDto {
    migrated: any;
    nonMigrated: any;
    totalMigrated: number;
    totalNonMigrated: number;
    totalOverall: number;
    migrationProgress: number;

    constructor(nonMigrated: any, migrated: any) {
        this.nonMigrated = nonMigrated;
        this.migrated = migrated;
        this.analyze();
    }

    analyze() {
        this.totalMigrated = this.migrated ? this.migrated.length : 0;
        this.totalNonMigrated = this.nonMigrated ? this.nonMigrated.length : 0;
        this.totalOverall = this.totalNonMigrated + this.totalMigrated;
        this.migrationProgress = (this.totalMigrated / this.totalOverall) * 100;
    }
}
