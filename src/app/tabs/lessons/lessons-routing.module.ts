import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';
import { LessonDetailPage } from './lesson-detail/lesson-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LessonsPage,
  },
  {
    path: ':id',
    component: LessonDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule {}
