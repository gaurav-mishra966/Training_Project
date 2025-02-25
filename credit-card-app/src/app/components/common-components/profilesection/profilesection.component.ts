import { Component, OnInit } from '@angular/core';
import { userService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { providePrimeNG } from 'primeng/config';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-profilesection',
  imports: [
    FormsModule,
    CommonModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    TooltipModule,
    AvatarModule,
  ],
  providers: [CookieService],
  templateUrl: './profilesection.component.html',
  styleUrl: './profilesection.component.scss',
})
export class ProfilesectionComponent implements OnInit {
  // user: User[] = [];
  user: User | null = null;
  errorMessage: string = '';
  userEmail: string | null = '';
  email: string = '';
  name: string = 'Gaurav';
  address: string = '';
  phone: String = '';
  profilePicture: string = 'https://i.imgur.com/LDOO4Qs.jpg';
  constructor(
    private userService: userService,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  // ngOnInit(): void {
  //   // const userLocale = this.cookieService.get('userLocale');

  //   this.userEmail = localStorage.getItem('UserEmailId');
  //   console.log(this.userEmail);
  //   if (this.userEmail) {
  //     this.userService.currentUser(this.userEmail).subscribe({
  //       next: (response) => {
  //         this.errorMessage = '✅ User Found';
  //         // Store the response in the user property
  //         this.email = response.email;
  //       },
  //       error: (error) => {
  //         // Handle any error while fetching user details
  //         this.errorMessage = 'Failed to fetch user details. Please try again.';
  //         console.error('Error fetching user details:', error);
  //       },
  //     });
  //   }
  // }

  ngOnInit(): void {
    this.email = localStorage.getItem('UserEmailId') || '';

    if (this.email) {
      this.userService.currentUser(this.email).subscribe({
        next: (response) => {
          this.user = response;
          this.errorMessage = ''; // Clear any previous error message
        },
        error: (error) => {
          this.user = null; // Ensure user is cleared if error occurs
          this.errorMessage = 'Failed to fetch user details. Please try again.';
          console.error('Error fetching user details:', error);
        },
      });
    }
  }

  editProfile() {}
}
