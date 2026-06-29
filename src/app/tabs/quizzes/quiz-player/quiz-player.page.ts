import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../core/services/quiz';
import { Quiz, QuizQuestion, SubmitAnswer } from '../../../core/models/quiz.model';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.page.html',
  styleUrls: ['./quiz-player.page.scss'],
  standalone: false,
})
export class QuizPlayerPage {
  quiz: Quiz | null = null;
  questions: QuizQuestion[] = [];
  currentIndex = 0;
  answers: Record<string, unknown> = {};

  loading = false;
  submitting = false;
  error = '';

  elapsed = 0;
  private timer?: ReturnType<typeof setInterval>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private quizService = inject(QuizService);

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.load(id);
  }

  ionViewWillLeave() {
    this.stopTimer();
  }

  private load(id: string) {
    this.loading = true;
    this.error = '';
    this.currentIndex = 0;
    this.answers = {};
    this.quizService.getQuiz(id).subscribe({
      next: (quiz) => {
        this.quiz = quiz;
        this.questions = [...(quiz.questions ?? [])].sort(
          (a, b) => a.order - b.order,
        );
        this.loading = false;
        this.startTimer();
      },
      error: () => {
        this.error = 'Unable to load this quiz.';
        this.loading = false;
      },
    });
  }

  private startTimer() {
    this.elapsed = 0;
    this.stopTimer();
    this.timer = setInterval(() => (this.elapsed += 1), 1000);
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  get currentQuestion(): QuizQuestion | null {
    return this.questions[this.currentIndex] ?? null;
  }

  get total(): number {
    return this.questions.length;
  }

  get answeredCount(): number {
    return this.questions.filter(
      (q) => this.answers[q.id] !== undefined && this.answers[q.id] !== null,
    ).length;
  }

  get progress(): number {
    return this.total ? this.answeredCount / this.total : 0;
  }

  get isLast(): boolean {
    return this.currentIndex === this.total - 1;
  }

  get timerLabel(): string {
    const m = Math.floor(this.elapsed / 60)
      .toString()
      .padStart(2, '0');
    const s = (this.elapsed % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  onAnswer(value: unknown) {
    if (this.currentQuestion) {
      this.answers = { ...this.answers, [this.currentQuestion.id]: value };
    }
  }

  isAnswered(index: number): boolean {
    const q = this.questions[index];
    return !!q && this.answers[q.id] !== undefined && this.answers[q.id] !== null;
  }

  goTo(index: number) {
    if (index >= 0 && index < this.total) {
      this.currentIndex = index;
    }
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  submit() {
    if (!this.quiz) {
      return;
    }
    this.submitting = true;
    this.stopTimer();
    const answers: SubmitAnswer[] = this.questions
      .filter((q) => this.answers[q.id] !== undefined)
      .map((q) => ({ questionId: q.id, answer: this.answers[q.id] }));

    this.quizService
      .submitAttempt(this.quiz.id, { timeTaken: this.elapsed, answers })
      .subscribe({
        next: (attempt) => {
          this.submitting = false;
          this.router.navigate(['/app/quizzes', this.quiz!.id, 'result'], {
            state: { attempt, quiz: this.quiz },
          });
        },
        error: () => {
          this.submitting = false;
          this.error = 'Failed to submit your answers. Please try again.';
          this.startTimer();
        },
      });
  }
}
