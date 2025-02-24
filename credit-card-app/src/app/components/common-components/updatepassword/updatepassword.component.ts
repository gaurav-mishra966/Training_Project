import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Assuming you have an AuthService for password reset
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-updatepassword',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.scss',
})
export class UpdatepasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  message: string = '';
  isSuccess: boolean = true;
  userEmail: string | null = localStorage.getItem('UserEmailId');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        email: [
          { value: this.userEmail, disabled: true },
          [Validators.required, Validators.email],
        ],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const { email, newPassword } = this.resetPasswordForm.value;

    this.authService.resetPassword(email, newPassword).subscribe(
      (response) => {
        this.isSuccess = true;
        this.message =
          'Password reset successfully! You can now log in with your new password.';
        setTimeout(() => {
          this.router.navigate(['/login']); // Navigate to the login page
        }, 2000);
      },
      (error) => {
        this.isSuccess = false;
        this.message = 'Failed to reset password. Please try again.';
        console.error(error);
      }
    );
  }
}
