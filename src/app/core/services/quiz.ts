import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  PaginatedResult,
  Quiz,
  QuizAttempt,
  QuizQuery,
  SubmitAttempt,
} from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private api = environment.apiUrl;
  private http = inject(HttpClient);

  getQuizzes(query: QuizQuery = {}) {
    let params = new HttpParams();
    if (query.page) {
      params = params.set('page', query.page);
    }
    if (query.limit) {
      params = params.set('limit', query.limit);
    }
    if (query.search) {
      params = params.set('search', query.search);
    }
    if (query.lessonId) {
      params = params.set('lessonId', query.lessonId);
    }
    return this.http.get<PaginatedResult<Quiz>>(`${this.api}/quizzes`, {
      params,
    });
  }

  getQuiz(id: string) {
    return this.http.get<Quiz>(`${this.api}/quizzes/${id}`);
  }

  submitAttempt(id: string, body: SubmitAttempt) {
    return this.http.post<QuizAttempt>(
      `${this.api}/quizzes/${id}/attempts`,
      body,
    );
  }

  getAttempts(id: string) {
    return this.http.get<QuizAttempt[]>(`${this.api}/quizzes/${id}/attempts`);
  }

  getAttempt(quizId: string, attemptId: string) {
    return this.http.get<QuizAttempt>(
      `${this.api}/quizzes/${quizId}/attempts/${attemptId}`,
    );
  }
}
