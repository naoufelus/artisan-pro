// artisans/artisan-list/artisan-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../artisans.service';
import { Artisan } from '../artisan.model';

@Component({
  selector: 'app-artisan-list',
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.scss']
})
export class ArtisanListComponent implements OnInit {
  artisans: Artisan[] = [];

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    this.loadArtisans();
  }

  loadArtisans(): void {
    this.artisanService.getArtisans().subscribe(
      artisans => this.artisans = artisans,
      error => console.error('Error loading artisans', error)
    );
  }

  deleteArtisan(id: number): void {
    if (confirm('Are you sure you want to delete this artisan?')) {
      this.artisanService.deleteArtisan(id).subscribe(
        () => this.loadArtisans(),
        error => console.error('Error deleting artisan', error)
      );
    }
  }
}