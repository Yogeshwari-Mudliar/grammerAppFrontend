import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzesPage } from './quizzes.page';
import { QuizPlayerPage } from './quiz-player/quiz-player.page';
import { QuizResultPage } from './quiz-result/quiz-result.page';

const routes: Routes = [
  {
    path: '',
    component: QuizzesPage,
  },
  {
    path: ':id',
    component: QuizPlayerPage,
  },
  {
    path: ':id/result',
    component: QuizResultPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesPageRoutingModule {}
