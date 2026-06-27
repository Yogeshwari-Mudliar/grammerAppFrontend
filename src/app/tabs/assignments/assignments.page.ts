import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.page.html',
  styleUrls: ['./assignments.page.scss'],
  standalone: false
})
export class AssignmentsPage implements OnInit {

  assignments = [
    {
      title: 'Programming Basics Quiz',
      dueDate: 'March 15, 2026',
      status: 'pending',
      submitted: false
    },
    {
      title: 'Web Development Project',
      dueDate: 'March 20, 2026',
      status: 'submitted',
      submitted: true
    },
    {
      title: 'Algorithm Challenge',
      dueDate: 'March 25, 2026',
      status: 'pending',
      submitted: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}