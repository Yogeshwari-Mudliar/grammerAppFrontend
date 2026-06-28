import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  loading = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  register() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.loading = true;
    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.loading = false;
        alert('Registration failed');
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
