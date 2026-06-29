import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizzesPageRoutingModule } from './quizzes-routing.module';

import { QuizzesPage } from './quizzes.page';
import { QuizPlayerPage } from './quiz-player/quiz-player.page';
import { QuizResultPage } from './quiz-result/quiz-result.page';
import { QuestionRendererComponent } from './components/question-renderer/question-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizzesPageRoutingModule,
  ],
  declarations: [
    QuizzesPage,
    QuizPlayerPage,
    QuizResultPage,
    QuestionRendererComponent,
  ],
})
export class QuizzesPageModule {}
