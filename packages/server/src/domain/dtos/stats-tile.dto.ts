export class StatsTileDto {
    totalMigrated: number;
    totalNonMigrated: number;
    totalOverall: number;
    migrationProgress: number;

    constructor(totalMigrated: number, totalNonMigrated: number) {
        this.totalMigrated = totalMigrated;
        this.totalNonMigrated = totalNonMigrated;
        this.totalOverall = this.totalNonMigrated + this.totalMigrated;
        this.migrationProgress = (this.totalMigrated / this.totalOverall) * 100;
    }
}
