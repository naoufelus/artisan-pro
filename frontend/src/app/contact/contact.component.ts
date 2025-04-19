// contact/contact.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required],
      artisanId: [null]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.sendContactRequest(this.contactForm.value).subscribe(
        () => {
          alert('Message envoyé avec succès!');
          this.contactForm.reset();
        },
        error => console.error('Error sending contact request', error)
      );
    }
  }
}