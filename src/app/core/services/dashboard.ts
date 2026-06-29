import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Dashboard } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private api = environment.apiUrl;
  private http = inject(HttpClient);

  getDashboard() {
    return this.http.get<Dashboard>(`${this.api}/dashboard`);
  }
}
