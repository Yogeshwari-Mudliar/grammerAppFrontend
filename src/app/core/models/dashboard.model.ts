export type Role = 'student' | 'teacher' | 'admin';

export interface ContinueLearning {
  lessonId: string;
  title: string;
  status: string;
  progressPercent: number;
}

export interface RecentLesson {
  lessonId: string;
  title: string;
  status: string;
  progressPercent: number;
  updatedAt: string;
}

export interface RecentQuiz {
  quizId: string;
  attemptId: string;
  title: string;
  percentage: number;
  passed: boolean;
  createdAt: string;
}

export interface UserStatistics {
  lessonsStarted: number;
  lessonsCompleted: number;
  quizAttempts: number;
  averageScore: number;
  completionPercentage: number;
  timeSpent: number;
  lastAccessedLesson: ContinueLearning | null;
}

export interface WelcomeSection {
  userId: number;
  email: string;
  role: Role;
}

export interface StudentDashboard {
  role: 'student';
  welcome: WelcomeSection;
  continueLearning: ContinueLearning | null;
  statistics: UserStatistics;
  overallCompletion: number;
  averageQuizScore: number;
  recentLessons: RecentLesson[];
  recentQuizzes: RecentQuiz[];
  announcements: unknown[];
}

export interface StudentOverview {
  totalStudents: number;
  activeStudents: number;
  averageCompletion: number;
}

export interface QuizPerformanceRow {
  quizId: string;
  title: string;
  attempts: number;
  averageScore: number;
}

export interface StudentQuizPerformance {
  totalAttempts: number;
  averageScore: number;
  topQuizzes: QuizPerformanceRow[];
}

export interface TeacherDashboard {
  role: 'teacher';
  welcome: WelcomeSection;
  continueLearning: ContinueLearning | null;
  personalProgress: UserStatistics;
  studentOverview: StudentOverview;
  studentQuizPerformance: StudentQuizPerformance;
  announcements: unknown[];
}

export interface RecentRegistration {
  id: number;
  email: string;
  role: Role;
  createdAt: string;
}

export interface ReportsSummary {
  totalLessonProgress: number;
  completedLessons: number;
  totalQuizAttempts: number;
  averageQuizScore: number;
}

export interface AdminDashboard {
  role: 'admin';
  welcome: WelcomeSection;
  totalUsers: number;
  students: number;
  teachers: number;
  admins: number;
  publishedLessons: number;
  publishedQuizzes: number;
  activeUsers: number;
  reportsSummary: ReportsSummary;
  recentRegistrations: RecentRegistration[];
}

export type Dashboard =
  | StudentDashboard
  | TeacherDashboard
  | AdminDashboard;
