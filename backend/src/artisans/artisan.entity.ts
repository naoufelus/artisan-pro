/* eslint-disable */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Artisan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  profession: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: false })
  messages: string;

  @Column({ type: 'text', nullable: false })
  appointments: string[];
  @Column({ type: 'text', nullable: false })
  reviews: string[];

  @Column({ type: 'float', default: 0 })
  averageRating: number;
}
