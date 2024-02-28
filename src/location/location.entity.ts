import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0.0 })
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, default: 0.0 })
  long: number;

  @Column({ type: 'tinyint', default: 1 })
  active: number;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;
}
