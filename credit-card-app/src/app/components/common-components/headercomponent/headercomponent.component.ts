import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headercomponent',
  imports: [CommonModule],
  templateUrl: './headercomponent.component.html',
  styleUrl: './headercomponent.component.scss',
})
export class HeadercomponentComponent {
  username: string = '';
  userRole: string = '';
  isDarkMode: boolean = false;
  isLoggedIn: boolean = true;
  isLoggedOut: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserName().subscribe((userName) => {
      this.username = userName;
      this.isLoggedIn = true;
    });

    this.authService.getUserRole().subscribe((role) => {
      this.userRole = role[0];
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  logout() {
    this.authService.setLoggedIn(false);
    this.authService.logout();
  }
}
