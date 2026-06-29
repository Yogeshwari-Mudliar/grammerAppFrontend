import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../core/services/lesson';
import {
  Lesson,
  LessonProgress,
  LessonSection,
  LessonSectionType,
} from '../../../core/models/lesson.model';

const SECTION_ORDER: LessonSectionType[] = [
  'HERO',
  'OBJECTIVES',
  'INTRODUCTION',
  'EXPLANATION',
  'EXAMPLES',
  'INTERACTIVE_ACTIVITY',
  'KNOWLEDGE_CHECK',
  'SUMMARY',
  'COMPLETION',
];

const SECTION_LABELS: Record<LessonSectionType, string> = {
  HERO: 'Overview',
  OBJECTIVES: 'Objectives',
  INTRODUCTION: 'Introduction',
  EXPLANATION: 'Explanation',
  EXAMPLES: 'Examples',
  INTERACTIVE_ACTIVITY: 'Interactive Activity',
  KNOWLEDGE_CHECK: 'Knowledge Check',
  SUMMARY: 'Summary',
  COMPLETION: 'Completion',
};

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.page.html',
  styleUrls: ['./lesson-detail.page.scss'],
  standalone: false,
})
export class LessonDetailPage {
  lesson?: Lesson;
  progress?: LessonProgress;
  loading = false;
  saving = false;
  error = '';

  private route = inject(ActivatedRoute);
  private lessonService = inject(LessonService);

  ionViewWillEnter() {
    this.load();
  }

  private get lessonId(): string {
    return this.route.snapshot.paramMap.get('id') ?? '';
  }

  load() {
    const id = this.lessonId;
    if (!id) {
      this.error = 'Lesson not found.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.lessonService.getLesson(id).subscribe({
      next: (lesson) => {
        this.lesson = lesson;
        this.loading = false;
        this.loadProgress(id);
      },
      error: () => {
        this.error = 'Unable to load this lesson.';
        this.loading = false;
      },
    });
  }

  private loadProgress(id: string) {
    this.lessonService.getProgress(id).subscribe({
      next: (progress) => {
        this.progress = progress;
        if (progress.status === 'NOT_STARTED') {
          this.markInProgress();
        }
      },
    });
  }

  orderedSections(): LessonSection[] {
    const sections = this.lesson?.sections ?? [];
    return [...sections].sort(
      (a, b) =>
        SECTION_ORDER.indexOf(a.type) - SECTION_ORDER.indexOf(b.type) ||
        a.order - b.order,
    );
  }

  label(type: LessonSectionType): string {
    return SECTION_LABELS[type] ?? type;
  }

  get percent(): number {
    return this.progress?.progressPercent ?? 0;
  }

  get isCompleted(): boolean {
    return this.progress?.status === 'COMPLETED';
  }

  markInProgress() {
    this.save({ status: 'IN_PROGRESS', progressPercent: this.percent || 0 });
  }

  markComplete() {
    this.save({ status: 'COMPLETED' });
  }

  private save(body: { status?: LessonProgress['status']; progressPercent?: number }) {
    if (!this.lesson) {
      return;
    }
    this.saving = true;
    this.lessonService.updateProgress(this.lesson.id, body).subscribe({
      next: (progress) => {
        this.progress = progress;
        this.saving = false;
      },
      error: () => {
        this.saving = false;
      },
    });
  }
}
