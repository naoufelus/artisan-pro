// search/search.component.ts
import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../artisans/artisan.service';
import { Artisan } from '../artisans/artisan.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  artisans: Artisan[] = [];
  searchTerm = '';
  professionFilter = '';

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

  get filteredArtisans(): Artisan[] {
    return this.artisans.filter(artisan => {
      const matchesSearch = artisan.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          artisan.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesProfession = !this.professionFilter || 
                              artisan.profession.toLowerCase() === this.professionFilter.toLowerCase();
      return matchesSearch && matchesProfession;
    });
  }
}