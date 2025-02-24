import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminsettings',
  imports: [],
  templateUrl: './adminsettings.component.html',
  styleUrl: './adminsettings.component.scss',
})
export class AdminsettingsComponent {
  constructor(private router: Router) {}
  changePassword(): void {
    this.router.navigate(['/changePassword']);
  }
}
