/* eslint-disable */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artisan } from '../artisans/artisan.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reviewerName: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column()
  date: Date;

  @ManyToOne(() => Artisan, (artisan) => artisan.reviews)
  artisan: Artisan;
}
