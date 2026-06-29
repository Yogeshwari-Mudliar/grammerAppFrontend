import { PaginatedResult } from './lesson.model';

export type { PaginatedResult };

export type QuestionType =
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'MATCH'
  | 'SENTENCE_BUILDER'
  | 'FIND_THE_MISTAKE';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  order: number;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  points: number;
  order: number;
  correctAnswer?: unknown;
  data?: Record<string, unknown>;
  options?: QuizOption[];
}

export interface QuizLessonRef {
  id: string;
  title: string;
  visibility: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string | null;
  isPublished: boolean;
  passingScore: number;
  timeLimit: number | null;
  order: number;
  questions?: QuizQuestion[];
  lesson?: QuizLessonRef;
  createdAt: string;
  updatedAt: string;
}

export interface AttemptAnswerResult {
  questionId: string;
  selected: unknown;
  correctAnswer: unknown;
  isCorrect: boolean;
  pointsEarned: number;
}

export interface QuizAttempt {
  id: string;
  userId: number;
  quizId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  timeTaken: number;
  answers: AttemptAnswerResult[];
  createdAt: string;
}

export interface SubmitAnswer {
  questionId: string;
  answer: unknown;
}

export interface SubmitAttempt {
  timeTaken?: number;
  answers: SubmitAnswer[];
}

export interface QuizQuery {
  page?: number;
  limit?: number;
  search?: string;
  lessonId?: string;
}
