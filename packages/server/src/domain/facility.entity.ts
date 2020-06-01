import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Facility')
export class Facility {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'int', nullable: true })
    code: number;

    @Column({ type: 'text', nullable: true })
    name: string;

    @Column({ type: 'datetime', nullable: true })
    created: Date;

    @Column({ type: 'datetime', nullable: true })
    snapshotDate: Date;

    @Column({ type: 'int', nullable: true })
    snapshotSiteCode: number;

    @Column({ type: 'int', nullable: true })
    snapshotVersion: number;

    @Column({ type: 'text', nullable: true })
    emr: string;

    @Column({ type: 'text', nullable: true })
    project: string;
}
