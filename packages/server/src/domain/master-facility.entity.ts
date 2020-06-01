import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('MasterFacility')
export class MasterFacility {
    @PrimaryColumn()
    code: number;

    @Column({ type: 'text', nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    county: string;

    @Column({ type: 'uuid', nullable: true })
    facilityId: Date;

    @Column({ type: 'datetime', nullable: true })
    snapShotDate: Date;

    @Column({ type: 'int', nullable: true })
    snapShotSiteCode: number;

    @Column({ type: 'int', nullable: true })
    snapshotVersion: number;
}
