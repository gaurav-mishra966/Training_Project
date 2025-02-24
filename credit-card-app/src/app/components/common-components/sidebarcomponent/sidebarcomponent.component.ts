import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-sidebarcomponent',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebarcomponent.component.html',
  styleUrl: './sidebarcomponent.component.scss',
})
export class SidebarcomponentComponent implements OnInit {
  isCollapsed = false;
  isDarkMode = false;
  userRole: string = 'guest';
  isLoggedOut: boolean = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleDarkMode() {
    debugger;
    this.isDarkMode = !this.isDarkMode;
  }

  ngOnInit(): void {
    this.authService.getUserRole().subscribe((roles: string) => {
      this.userRole = roles[0];
    });
  }

  logout() {
    this.alertService.showAlert('User Logged Out!!!', 'alert-warning', true);
    this.authService.setLoggedIn(false);
    this.authService.logout();
    this.isLoggedOut = true;
  }
}
