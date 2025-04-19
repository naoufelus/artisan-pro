// artisans/artisan-form/artisan-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtisanService } from '../artisan.service';
import { Artisan } from '../artisan.model';

@Component({
  selector: 'app-artisan-form',
  templateUrl: './artisan-form.component.html',
  styleUrls: ['./artisan-form.component.css']
})
export class ArtisanFormComponent implements OnInit {
  artisanForm: FormGroup;
  isEditMode = false;
  artisanId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private artisanService: ArtisanService
  ) {
    this.artisanForm = this.fb.group({
      name: ['', Validators.required],
      profession: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.artisanId = +params['id'];
        this.loadArtisan(this.artisanId);
      }
    });
  }

  loadArtisan(id: number): void {
    this.artisanService.getArtisan(id).subscribe(
      artisan => this.artisanForm.patchValue(artisan),
      error => console.error('Error loading artisan', error)
    );
  }

  onSubmit(): void {
    if (this.artisanForm.valid) {
      const artisanData = this.artisanForm.value;
      
      if (this.isEditMode && this.artisanId) {
        this.artisanService.updateArtisan(this.artisanId, artisanData).subscribe(
          () => this.router.navigate(['/artisans', this.artisanId]),
          error => console.error('Error updating artisan', error)
        );
      } else {
        this.artisanService.createArtisan(artisanData).subscribe(
          (artisan) => this.router.navigate(['/artisans', artisan.id]),
          error => console.error('Error creating artisan', error)
        );
      }
    }
  }
}