import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage { 
  email = '';
  password = '';
  showPassword = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/app');
      },
      error: () => {
        alert('Invalid login');
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }}