import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { QuizService } from '../../core/services/quiz';
import { Quiz } from '../../core/models/quiz.model';

const PAGE_LIMIT = 10;

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.page.html',
  styleUrls: ['./quizzes.page.scss'],
  standalone: false,
})
export class QuizzesPage {
  quizzes: Quiz[] = [];
  searchTerm = '';
  loading = false;
  error = '';

  private page = 1;
  private totalPages = 1;

  private quizService = inject(QuizService);
  private router = inject(Router);

  ionViewWillEnter() {
    this.reload();
  }

  reload() {
    this.loading = true;
    this.error = '';
    this.page = 1;
    this.quizService
      .getQuizzes({
        page: 1,
        limit: PAGE_LIMIT,
        search: this.searchTerm || undefined,
      })
      .subscribe({
        next: (res) => {
          this.quizzes = res.data;
          this.totalPages = res.totalPages;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load quizzes. Please try again.';
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
    this.page += 1;
    this.quizService
      .getQuizzes({
        page: this.page,
        limit: PAGE_LIMIT,
        search: this.searchTerm || undefined,
      })
      .subscribe({
        next: (res) => {
          this.quizzes = [...this.quizzes, ...res.data];
          this.totalPages = res.totalPages;
          event.target.complete();
        },
        error: () => event.target.complete(),
      });
  }

  get hasMore(): boolean {
    return this.page < this.totalPages;
  }

  open(quiz: Quiz) {
    this.router.navigate(['/app/quizzes', quiz.id]);
  }
}
