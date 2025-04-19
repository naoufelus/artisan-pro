/* eslint-disable */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artisan } from '../artisans/artisan.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderName: string;

  @Column()
  content: string;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Artisan, (artisan) => artisan.messages)
  artisan: Artisan;
}
