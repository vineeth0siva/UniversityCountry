import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-contact-us',
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private http: HttpClient) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)])
    });
  }
  onSubmit() {

    if (this.contactForm.valid) {
      const formData = {
        ...this.contactForm.value, 
        access_key: 'c0189914-81ee-459e-8f5f-140022aa0b1c' 
      };
      this.http.post('https://api.web3forms.com/submit', formData).subscribe({
        next: () => {
          alert('Form Submitted Successfully');
        },
        error: (err) => {
          alert('Error Occured' + err);
          console.log(err);
          
        }
      });
      console.log(this.contactForm.value);
    }
  }
}
