import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth{

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post(`${this.api}/auth/register`, { email, password });
  }

  login(email: string, password: string) {
    // Mock login for demo purposes
    if (email && password) {
      localStorage.setItem('token', 'mock-jwt-token');
      return of({ access_token: 'mock-jwt-token' });
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
}