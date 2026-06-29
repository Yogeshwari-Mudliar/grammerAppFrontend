export type Visibility = 'STUDENT' | 'TEACHER' | 'BOTH';

export type LessonSectionType =
  | 'HERO'
  | 'OBJECTIVES'
  | 'INTRODUCTION'
  | 'EXPLANATION'
  | 'EXAMPLES'
  | 'INTERACTIVE_ACTIVITY'
  | 'KNOWLEDGE_CHECK'
  | 'SUMMARY'
  | 'COMPLETION';

export type ActivityType =
  | 'FLASH_CARDS'
  | 'MATCH'
  | 'DRAG_AND_DROP'
  | 'FILL_BLANK'
  | 'TRUE_FALSE'
  | 'SENTENCE_BUILDER'
  | 'FIND_THE_MISTAKE';

export type ProgressStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface LessonSection {
  id: string;
  type: LessonSectionType;
  title: string | null;
  body: string | null;
  order: number;
}

export interface LessonExample {
  id: string;
  title: string | null;
  content: string;
  order: number;
}

export interface LessonActivity {
  id: string;
  type: ActivityType;
  title: string | null;
  data: Record<string, unknown>;
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  visibility: Visibility;
  isPublished: boolean;
  order: number;
  sections?: LessonSection[];
  examples?: LessonExample[];
  activities?: LessonActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  id: string;
  userId: number;
  lessonId: string;
  status: ProgressStatus;
  progressPercent: number;
  completedAt: string | null;
}
