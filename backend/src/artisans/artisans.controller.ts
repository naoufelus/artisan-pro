// artisans/artisans.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ArtisansService } from './artisans.service';
import { Artisan } from './artisan.entity';

@Controller('artisans')
export class ArtisansController {
  constructor(private readonly artisansService: ArtisansService) {}

  @Get()
  findAll(): Promise<Artisan[]> {
    return this.artisansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Artisan> {
    return this.artisansService.findOne(+id);
  }

  @Post()
  create(@Body() artisan: Artisan): Promise<Artisan> {
    return this.artisansService.create(artisan);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() artisan: Artisan): Promise<Artisan> {
    return this.artisansService.update(+id, artisan);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.artisansService.remove(+id);
  }
}
