/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artisan } from './artisan.entity';

@Injectable()
export class ArtisansService {
  constructor(
    @InjectRepository(Artisan)
    private artisansRepository: Repository<Artisan>,
  ) {}

  findAll(): Promise<Artisan[]> {
    return this.artisansRepository.find();
  }

  // findOne(id: number): Promise<Artisan> {
  //   return this.artisansRepository.findOne({ where: { id } });
  // }

  async create(artisan: Artisan): Promise<Artisan> {
    return this.artisansRepository.save(artisan);
  }

  // async update(id: number, artisan: Partial<Artisan>): Promise<Artisan> {
  //   await this.artisansRepository.update(id, artisan);
  //   return this.artisansRepository.findOne({ where: { id } });
  // }

  async remove(id: number): Promise<void> {
    await this.artisansRepository.delete(id);
  }
}
