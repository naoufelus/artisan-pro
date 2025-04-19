// artisans/artisan-detail/artisan-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../artisans.service';
import { ReviewService } from '../../reviews/review.service';
import { Artisan } from '../artisan.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-artisan-detail',
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.css']
})
export class ArtisanDetailComponent implements OnInit {
  artisan: Artisan | null = null;
  reviews: any[] = [];
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      reviewerName: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['']
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    
    this.artisanService.getArtisan(id).subscribe(
      artisan => this.artisan = artisan,
      error => console.error('Error loading artisan', error)
    );

    this.loadReviews(id);
  }

  loadReviews(artisanId: number): void {
    this.reviewService.getReviews(artisanId).subscribe(
      reviews => this.reviews = reviews,
      error => console.error('Error loading reviews', error)
    );
  }

  submitReview(): void {
    if (this.reviewForm.valid && this.artisan) {
      const review = {
        ...this.reviewForm.value,
        artisanId: this.artisan.id,
        date: new Date()
      };

      this.reviewService.createReview(review).subscribe(
        () => {
          this.loadReviews(this.artisan!.id);
          this.reviewForm.reset();
          this.reviewForm.patchValue({ rating: 5 });
        },
        error => console.error('Error submitting review', error)
      );
    }
  }
}