import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Lesson,
  LessonProgress,
  LessonQuery,
  PaginatedResult,
  ProgressStatus,
} from '../models/lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private api = environment.apiUrl;
  private http = inject(HttpClient);

  getLessons(query: LessonQuery = {}) {
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
    return this.http.get<PaginatedResult<Lesson>>(`${this.api}/lessons`, {
      params,
    });
  }

  getLesson(id: string) {
    return this.http.get<Lesson>(`${this.api}/lessons/${id}`);
  }

  getMyProgress() {
    return this.http.get<LessonProgress[]>(`${this.api}/progress`);
  }

  getProgress(lessonId: string) {
    return this.http.get<LessonProgress>(
      `${this.api}/progress/lessons/${lessonId}`,
    );
  }

  updateProgress(
    lessonId: string,
    body: { status?: ProgressStatus; progressPercent?: number },
  ) {
    return this.http.put<LessonProgress>(
      `${this.api}/progress/lessons/${lessonId}`,
      body,
    );
  }
}
