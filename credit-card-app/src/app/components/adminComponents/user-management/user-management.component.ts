import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';
import { userService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  totalCount: number = 0;
  loading: boolean = true;
  errorMessage: string = '';
  suspendedUser: string = '';

  constructor(private userService: userService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // filteredUsers = [...this.users]; // Users that will be displayed

  currentPage = 1;
  usersPerPage = 20;
  totalPages = Math.ceil(this.users.length / this.usersPerPage);
  searchQuery: string = '';
  sortField: string = '';
  sortDirection: boolean = true;

  handleUserAction(userName: string, currentStatus: string): void {
    const user = this.users.find((user) => user.username === userName);
    if (user) {
      // Change status based on current status
      user.status = currentStatus === 'Active' ? 'Inactive' : 'Active';
      // Highlight the user who was suspended
      if (user.status === 'Inactive') {
        this.suspendedUser = user.username;
        console.log(user.username); // Set the suspended user
      } else {
        this.suspendedUser = ''; // Clear if re-activated
      }
    }
    this.updateFilteredUsers();
  }

  updateFilteredUsers(): void {
    this.filteredUsers = this.users
      .filter((user) =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .slice(
        (this.currentPage - 1) * this.usersPerPage,
        this.currentPage * this.usersPerPage
      );

    this.totalPages = Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  filterUsers(): void {
    this.currentPage = 1; // Reset to first page when filter changes
    this.updateFilteredUsers();
  }

  changePage(direction: string): void {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.updateFilteredUsers();
  }

  // Check if a username matches the search query
  isSearchMatch(username: string): boolean {
    return username.toLowerCase().includes(this.searchQuery.toLowerCase());
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response.users; // List of users from API
        this.totalCount = response.totalCount; // Total count from API
        this.loading = false; // Stop loading after data is fetched
        this.updateFilteredUsers();
      },
      (error) => {
        this.loading = false;
        // Handle the error (show alert, etc.)
        console.error(error);
      }
    );
  }
}
