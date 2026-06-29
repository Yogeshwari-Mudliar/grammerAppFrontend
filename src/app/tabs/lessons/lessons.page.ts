import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { LessonService } from '../../core/services/lesson';
import { Lesson, LessonProgress } from '../../core/models/lesson.model';

type LessonWithProgress = Lesson & { progress?: LessonProgress };

const PAGE_LIMIT = 10;

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
  standalone: false,
})
export class LessonsPage {
  lessons: LessonWithProgress[] = [];
  continueLearning: LessonProgress[] = [];
  searchTerm = '';

  loading = false;
  loadingMore = false;
  error = '';

  private page = 1;
  private totalPages = 1;
  private progressByLesson = new Map<string, LessonProgress>();

  private lessonService = inject(LessonService);
  private router = inject(Router);

  ionViewWillEnter() {
    this.reload();
  }

  reload() {
    this.loading = true;
    this.error = '';
    this.page = 1;
    forkJoin({
      lessons: this.lessonService.getLessons({
        page: 1,
        limit: PAGE_LIMIT,
        search: this.searchTerm || undefined,
      }),
      progress: this.lessonService.getMyProgress(),
    }).subscribe({
      next: ({ lessons, progress }) => {
        this.progressByLesson = new Map(progress.map((p) => [p.lessonId, p]));
        this.continueLearning = progress.filter(
          (p) => p.status === 'IN_PROGRESS' && p.lesson,
        );
        this.totalPages = lessons.totalPages;
        this.lessons = lessons.data.map((l) => this.withProgress(l));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load lessons. Please try again.';
        this.loading = false;
      },
    });
  }

  onSearch(event: CustomEvent) {
    this.searchTerm = (event.detail.value as string) ?? '';
    this.reload();
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    if (this.page >= this.totalPages) {
      event.target.complete();
      return;
    }
    this.loadingMore = true;
    this.page += 1;
    this.lessonService
      .getLessons({
        page: this.page,
        limit: PAGE_LIMIT,
        search: this.searchTerm || undefined,
      })
      .subscribe({
        next: (res) => {
          this.lessons = [
            ...this.lessons,
            ...res.data.map((l) => this.withProgress(l)),
          ];
          this.totalPages = res.totalPages;
          this.loadingMore = false;
          event.target.complete();
        },
        error: () => {
          this.loadingMore = false;
          event.target.complete();
        },
      });
  }

  get hasMore(): boolean {
    return this.page < this.totalPages;
  }

  private withProgress(lesson: Lesson): LessonWithProgress {
    return { ...lesson, progress: this.progressByLesson.get(lesson.id) };
  }

  open(lessonId: string) {
    this.router.navigate(['/app/lessons', lessonId]);
  }

  isCompleted(lesson: LessonWithProgress): boolean {
    return lesson.progress?.status === 'COMPLETED';
  }

  percent(lesson: LessonWithProgress): number {
    return lesson.progress?.progressPercent ?? 0;
  }
}
