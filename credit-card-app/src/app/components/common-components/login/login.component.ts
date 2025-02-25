import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { AlertcomponentComponent } from '../alertcomponent/alertcomponent.component';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, AlertcomponentComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userRole: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  showAlert = false;
  alertMessage = '';
  alertType: 'alert-success' | 'alert-error' | 'alert-warning' | 'alert-info' =
    'alert-info';
  alertDuration = 5000;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private cookieService: CookieService
  ) {}

  login() {
    this.errorMessage = '';
    try {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          const sessoinToken = sessionStorage.setItem(
            'authToken',
            response.token
          );
          const profileImage = sessionStorage.setItem(
            'profilePicture',
            'https://i.imgur.com/LDOO4Qs.jpg'
          );
          const productlogoImage = sessionStorage.setItem(
            'logoPicture',
            'https://fakestoreapi.com/icons/logo.png'
          );
          if (response && response.token) {
            // If the response is successful and contains a token
            this.authService.setLoggedIn(true);
            this.isLoggedIn = true;

            //implementing cookie to store client local info and apply setting to ui
            const userLocale = navigator.language || 'en-US';
            this.cookieService.set('userLocale', userLocale);

            //implementing roles based filtering
            const roles = response.roles;
            this.authService.setUserName(response.username);
            this.authService.setUserEmail(response.userEmail);

            // Navigate based on user type
            if (roles.includes('admin')) {
              this.router.navigate(['/admin-dashboard']);
            } else if (roles.includes('user')) {
              this.router.navigate(['/user-dashboard']);
            } else if (roles.includes('guest')) {
              this.router.navigate(['/home']);
            } else {
              this.showErrorAlert();
            }
            this.showSuccessAlert();
            this.authService.setUserRole(roles);
          } else {
            this.handleInvalidLogin(this.errorMessage);
          }
        },
        (error) => {
          this.alertService.showAlert(error.message, 'alert-error', true);
        }
      );
    } catch {
      this.alertService.showAlert(this.errorMessage, 'alert-error', true);
    }
  }

  handleInvalidLogin(message: string) {
    this.errorMessage = message;
    this.showWarningAlert('Credentials Mismatched');
    this.email = '';
    this.password = '';
    this.authService.setLoggedIn(false);
  }

  showSuccessAlert() {
    this.alertService.showAlert('Login successful!', 'alert-success', true);
  }

  showErrorAlert() {
    this.alertService.showAlert(
      'This is an error message!',
      'alert-error',
      true
    );
  }

  showWarningAlert(errorMessage: string) {
    this.alertService.showAlert(errorMessage, 'alert-warning', true);
  }

  showInfoAlert() {
    this.alertService.showAlert(
      'This is an informational message!',
      'alert-info',
      true
    );
  }

  ngOnInit(): void {
    // Optionally, subscribe to the logged-in status for further use in the component
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
}
