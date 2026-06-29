import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { QuizQuestion } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-question-renderer',
  templateUrl: './question-renderer.component.html',
  styleUrls: ['./question-renderer.component.scss'],
  standalone: false,
})
export class QuestionRendererComponent implements OnChanges {
  @Input() question!: QuizQuestion;
  @Input() answer: unknown;
  @Output() answerChange = new EventEmitter<unknown>();

  selectedOption: string | null = null;
  fillValue = '';
  matchMap: Record<string, string> = {};
  arranged: string[] = [];
  pool: { token: string; used: boolean }[] = [];
  selectedWord: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] || changes['answer']) {
      this.reinit();
    }
  }

  get leftItems(): string[] {
    return (this.question.data?.['left'] as string[]) ?? [];
  }

  get rightItems(): string[] {
    return (this.question.data?.['right'] as string[]) ?? [];
  }

  get tokens(): string[] {
    return (this.question.data?.['tokens'] as string[]) ?? [];
  }

  get sentenceWords(): string[] {
    const sentence = (this.question.data?.['sentence'] as string) ?? '';
    return sentence.trim().length ? sentence.trim().split(/\s+/) : [];
  }

  private reinit(): void {
    this.selectedOption = null;
    this.fillValue = '';
    this.matchMap = {};
    this.arranged = [];
    this.selectedWord = null;
    this.pool = this.tokens.map((token) => ({ token, used: false }));

    const a = this.answer;
    switch (this.question.type) {
      case 'MULTIPLE_CHOICE':
      case 'TRUE_FALSE':
        this.selectedOption = typeof a === 'string' ? a : null;
        break;
      case 'FILL_BLANK':
        this.fillValue = typeof a === 'string' ? a : '';
        break;
      case 'MATCH':
        if (Array.isArray(a)) {
          for (const pair of a as { left: string; right: string }[]) {
            if (pair?.left) {
              this.matchMap[pair.left] = pair.right;
            }
          }
        }
        break;
      case 'SENTENCE_BUILDER':
        if (Array.isArray(a)) {
          this.arranged = [...(a as string[])];
          for (const token of this.arranged) {
            const slot = this.pool.find((p) => p.token === token && !p.used);
            if (slot) {
              slot.used = true;
            }
          }
        }
        break;
      case 'FIND_THE_MISTAKE':
        this.selectedWord = typeof a === 'string' ? a : null;
        break;
    }
  }

  emitOption(): void {
    this.answerChange.emit(this.selectedOption);
  }

  emitFill(): void {
    this.answerChange.emit(this.fillValue);
  }

  emitMatch(): void {
    const pairs = this.leftItems
      .map((left) => ({ left, right: this.matchMap[left] }))
      .filter((p) => p.right !== undefined && p.right !== null);
    this.answerChange.emit(pairs);
  }

  pushToken(index: number): void {
    const slot = this.pool[index];
    if (!slot || slot.used) {
      return;
    }
    slot.used = true;
    this.arranged = [...this.arranged, slot.token];
    this.answerChange.emit(this.arranged);
  }

  removeToken(index: number): void {
    const [removed] = this.arranged.splice(index, 1);
    this.arranged = [...this.arranged];
    const slot = this.pool.find((p) => p.token === removed && p.used);
    if (slot) {
      slot.used = false;
    }
    this.answerChange.emit(this.arranged);
  }

  resetTokens(): void {
    this.arranged = [];
    this.pool.forEach((p) => (p.used = false));
    this.answerChange.emit(this.arranged);
  }

  selectWord(word: string): void {
    this.selectedWord = word;
    this.answerChange.emit(word);
  }
}
