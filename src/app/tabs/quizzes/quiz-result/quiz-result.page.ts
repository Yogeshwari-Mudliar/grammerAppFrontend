import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AttemptAnswerResult,
  Quiz,
  QuizAttempt,
  QuizQuestion,
} from '../../../core/models/quiz.model';

interface ReviewRow {
  prompt: string;
  type: string;
  yourAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.page.html',
  styleUrls: ['./quiz-result.page.scss'],
  standalone: false,
})
export class QuizResultPage {
  attempt: QuizAttempt | null = null;
  quiz: Quiz | null = null;
  rows: ReviewRow[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ionViewWillEnter() {
    const state = history.state as { attempt?: QuizAttempt; quiz?: Quiz };
    this.attempt = state.attempt ?? null;
    this.quiz = state.quiz ?? null;

    if (!this.attempt) {
      // No result to show (e.g. page reloaded) — return to the quiz.
      const id = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['/app/quizzes', id]);
      return;
    }
    this.buildRows();
  }

  get percentage(): number {
    return Number(this.attempt?.percentage ?? 0);
  }

  get passed(): boolean {
    return !!this.attempt?.passed;
  }

  get timeLabel(): string {
    const t = this.attempt?.timeTaken ?? 0;
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  private buildRows() {
    const byId = new Map<string, QuizQuestion>(
      (this.quiz?.questions ?? []).map((q) => [q.id, q]),
    );
    this.rows = (this.attempt?.answers ?? []).map((a) => {
      const q = byId.get(a.questionId);
      return {
        prompt: q?.prompt ?? 'Question',
        type: (q?.type ?? '').replace('_', ' '),
        yourAnswer: this.render(q, a.selected),
        correctAnswer: this.render(q, a.correctAnswer),
        isCorrect: a.isCorrect,
        pointsEarned: a.pointsEarned,
      };
    });
  }

  private render(question: QuizQuestion | undefined, value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    if (
      question &&
      (question.type === 'MULTIPLE_CHOICE' || question.type === 'TRUE_FALSE')
    ) {
      const ids = Array.isArray(value) ? value : [value];
      return ids
        .map((id) => this.optionText(question, String(id)))
        .join(', ');
    }
    if (Array.isArray(value)) {
      if (value.length && typeof value[0] === 'object') {
        return (value as { left: string; right: string }[])
          .map((p) => `${p.left} → ${p.right}`)
          .join(', ');
      }
      return (value as unknown[]).join(' ');
    }
    if (typeof value === 'object') {
      return Object.entries(value as Record<string, unknown>)
        .map(([k, v]) => `${k} → ${String(v)}`)
        .join(', ');
    }
    return String(value);
  }

  private optionText(question: QuizQuestion, optionId: string): string {
    const opt = (question.options ?? []).find((o) => o.id === optionId);
    return opt ? opt.text : optionId;
  }

  retry() {
    if (this.attempt) {
      this.router.navigate(['/app/quizzes', this.attempt.quizId]);
    }
  }

  backToList() {
    this.router.navigate(['/app/quizzes']);
  }

  trackRow(_index: number, row: ReviewRow) {
    return row.prompt;
  }
}
