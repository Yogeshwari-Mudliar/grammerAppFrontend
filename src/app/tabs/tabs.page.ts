import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../core/services/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false
})
export class TabsPage {

  appPages = [
    { title: 'Dashboard', url: '/app/dashboard', icon: 'home' },
    { title: 'Courses', url: '/app/courses', icon: 'book' },
    { title: 'Lessons', url: '/app/lessons', icon: 'play' },
    { title: 'Assignments', url: '/app/assignments', icon: 'document' },
    { title: 'Profile', url: '/app/profile', icon: 'person' }
  ];

  constructor(private auth: Auth, private router: Router) {}
isCollapsed = false;

toggleSidebar() {
  this.isCollapsed = !this.isCollapsed;
}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}