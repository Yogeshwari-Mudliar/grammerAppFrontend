import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Lesson,
  LessonProgress,
  ProgressStatus,
} from '../models/lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private api = environment.apiUrl;
  private http = inject(HttpClient);

  getLessons() {
    return this.http.get<Lesson[]>(`${this.api}/lessons`);
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
