import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
  standalone: false
})
export class LessonsPage implements OnInit {

  lessons = [
    {
      title: 'Variables and Data Types',
      completed: true,
      duration: '15 min'
    },
    {
      title: 'Control Structures',
      completed: true,
      duration: '20 min'
    },
    {
      title: 'Functions and Methods',
      completed: false,
      duration: '25 min'
    },
    {
      title: 'Object-Oriented Programming',
      completed: false,
      duration: '30 min'
    },
    {
      title: 'Error Handling',
      completed: false,
      duration: '18 min'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}