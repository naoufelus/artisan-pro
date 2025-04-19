/* eslint-disable */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artisan } from '../artisans/artisan.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column()
  clientEmail: string;

  @Column()
  clientPhone: string;

  @Column()
  date: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Artisan, (artisan) => artisan.appointments)
  artisan: Artisan;
}
