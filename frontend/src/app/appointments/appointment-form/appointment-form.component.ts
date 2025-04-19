// appointments/appointment-form/appointment-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtisanService } from '../../artisans/artisan.service';
import { AppointmentService } from '../appointment.service';
import { Artisan } from '../../artisans/artisan.model';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  artisan: Artisan | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private artisanService: ArtisanService,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientPhone: ['', Validators.required],
      date: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    const artisanId = +this.route.snapshot.params['artisanId'];
    this.artisanService.getArtisan(artisanId).subscribe(
      artisan => this.artisan = artisan,
      error => console.error('Error loading artisan', error)
    );
  }

  onSubmit(): void {
    if (this.appointmentForm.valid && this.artisan) {
      const appointmentData = {
        ...this.appointmentForm.value,
        artisanId: this.artisan.id
      };

      this.appointmentService.createAppointment(appointmentData).subscribe(
        () => {
          alert('Rendez-vous enregistré avec succès!');
          this.router.navigate(['/artisans', this.artisan?.id]);
        },
        error => console.error('Error creating appointment', error)
      );
    }
  }
}