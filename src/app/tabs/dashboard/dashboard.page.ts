import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard';
import {
  AdminDashboard,
  Dashboard,
  StudentDashboard,
  TeacherDashboard,
} from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  dashboard: Dashboard | null = null;
  loading = false;
  error = '';

  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load your dashboard. Please try again.';
        this.loading = false;
      },
    });
  }

  get student(): StudentDashboard | null {
    return this.dashboard?.role === 'student' ? this.dashboard : null;
  }

  get teacher(): TeacherDashboard | null {
    return this.dashboard?.role === 'teacher' ? this.dashboard : null;
  }

  get admin(): AdminDashboard | null {
    return this.dashboard?.role === 'admin' ? this.dashboard : null;
  }

  get displayName(): string {
    const email = this.dashboard?.welcome.email ?? '';
    return email.split('@')[0] || 'there';
  }

  formatTime(seconds: number): string {
    const m = Math.floor((seconds ?? 0) / 60);
    const s = (seconds ?? 0) % 60;
    if (m >= 60) {
      const h = Math.floor(m / 60);
      return `${h}h ${m % 60}m`;
    }
    return `${m}m ${s}s`;
  }

  openLesson(lessonId: string) {
    this.router.navigate(['/app/lessons', lessonId]);
  }

  openQuiz(quizId: string) {
    this.router.navigate(['/app/quizzes', quizId]);
  }
}
