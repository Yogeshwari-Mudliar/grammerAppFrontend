import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null
  };

  constructor(private auth: Auth, private router: Router) { }

  ngOnInit() {
  }

  saveProfile() {
    // Implement save profile logic
    console.log('Profile saved');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}