import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LessonService } from '../../core/services/lesson';
import { Lesson, LessonProgress } from '../../core/models/lesson.model';

type LessonWithProgress = Lesson & { progress?: LessonProgress };

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
  standalone: false,
})
export class LessonsPage {
  lessons: LessonWithProgress[] = [];
  loading = false;
  error = '';

  private lessonService = inject(LessonService);
  private router = inject(Router);

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    forkJoin({
      lessons: this.lessonService.getLessons(),
      progress: this.lessonService.getMyProgress(),
    }).subscribe({
      next: ({ lessons, progress }) => {
        const byLesson = new Map(progress.map((p) => [p.lessonId, p]));
        this.lessons = lessons.map((l) => ({
          ...l,
          progress: byLesson.get(l.id),
        }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load lessons. Please try again.';
        this.loading = false;
      },
    });
  }

  open(lesson: LessonWithProgress) {
    this.router.navigate(['/app/lessons', lesson.id]);
  }

  isCompleted(lesson: LessonWithProgress): boolean {
    return lesson.progress?.status === 'COMPLETED';
  }

  percent(lesson: LessonWithProgress): number {
    return lesson.progress?.progressPercent ?? 0;
  }
}
