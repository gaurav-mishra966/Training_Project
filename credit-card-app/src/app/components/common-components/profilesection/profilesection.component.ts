import { Component, OnInit } from '@angular/core';
import { userService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profilesection',
  imports: [FormsModule, CommonModule],
  templateUrl: './profilesection.component.html',
  styleUrl: './profilesection.component.scss',
})
export class ProfilesectionComponent implements OnInit {
  // user: User[] = [];
  user: User | null = null;
  errorMessage: string = '';
  userEmail: string | null = '';
  email: string = '';
  constructor(
    private userService: userService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('UserEmailId');
    console.log(this.userEmail);
    if (this.userEmail) {
      this.userService.currentUser(this.userEmail).subscribe({
        next: (response) => {
          this.errorMessage = '✅ User Found';
          // Store the response in the user property
          this.email = response.email;
        },
        error: (error) => {
          // Handle any error while fetching user details
          this.errorMessage = 'Failed to fetch user details. Please try again.';
          console.error('Error fetching user details:', error);
        },
      });
    }
  }

  editProfile() {}
}
