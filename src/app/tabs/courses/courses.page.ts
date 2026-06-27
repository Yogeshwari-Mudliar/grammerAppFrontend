import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
  standalone: false
})
export class CoursesPage implements OnInit {

  courses = [
    {
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming with hands-on examples.',
      progress: 75,
      continueUrl: '/app/lessons'
    },
    {
      title: 'Web Development Fundamentals',
      description: 'Build your first website using HTML, CSS, and JavaScript.',
      progress: 50,
      continueUrl: '/app/lessons'
    },
    {
      title: 'Data Structures and Algorithms',
      description: 'Master essential data structures and algorithmic thinking.',
      progress: 25,
      continueUrl: '/app/lessons'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}