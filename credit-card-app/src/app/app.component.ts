import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HeadercomponentComponent } from './components/common-components/headercomponent/headercomponent.component';
import { SidebarcomponentComponent } from './components/common-components/sidebarcomponent/sidebarcomponent.component';
import { FootercomponentComponent } from './components/common-components/footercomponent/footercomponent.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/common-components/login/login.component';
import { CommonModule } from '@angular/common';
import { AlertcomponentComponent } from './components/common-components/alertcomponent/alertcomponent.component';
import { AlertService } from './services/alert.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeadercomponentComponent,
    SidebarcomponentComponent,
    FootercomponentComponent,
    LoginComponent,
    RouterModule,
    AlertcomponentComponent,
  ],
  providers: [AlertService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'credit-card-app';
  isLoggedIn: boolean = false;
  isDarkMode = false;
  showAlert = false;
  alertMessage = '';
  alertType: 'alert-success' | 'alert-error' | 'alert-warning' | 'alert-info' =
    'alert-info';
  alertDuration = 3000;
  // breadcrumbs: Array<{ label: string; url: string }> = [];
  breadcrumbs: Array<{ label: string; url: string; icon: string }> = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateBreadcrumbs(this.activatedRoute.root));
  }
  updateBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string; url: string; icon: string }> = []
  ): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      this.breadcrumbs = breadcrumbs;
      return;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL) {
        const breadcrumbLabel = child.snapshot.data['breadcrumb'] || routeURL;
        const breadcrumbIcon = this.getIconForRoute(routeURL); // Get icon based on route
        breadcrumbs.push({
          label: breadcrumbLabel,
          url: `${url}/${routeURL}`,
          icon: breadcrumbIcon,
        });
      }
      this.updateBreadcrumbs(child, `${url}/${routeURL}`, breadcrumbs);
    }
  }

  // Function to return an icon based on the route
  getIconForRoute(routeURL: string): string {
    switch (routeURL) {
      case 'home':
        return 'fas fa-home';
      case 'products':
        return 'fas fa-cogs';
      case 'services':
        return 'fas fa-concierge-bell';
      case 'user-dashboard':
        return 'fas fa-user';
      case 'profile':
        return 'fas fa fa-circle';
      default:
        return 'fas fa-file-alt';
    }
  }
  // updateBreadcrumbs(
  //   route: ActivatedRoute,
  //   url: string = '',
  //   breadcrumbs: Array<{ label: string; url: string }> = []
  // ): void {
  //   const children: ActivatedRoute[] = route.children;

  //   if (children.length === 0) {
  //     this.breadcrumbs = breadcrumbs;
  //     return;
  //   }

  //   for (const child of children) {
  //     const routeURL: string = child.snapshot.url
  //       .map((segment) => segment.path)
  //       .join('/');
  //     if (routeURL) {
  //       breadcrumbs.push({ label: routeURL, url: `${url}/${routeURL}` });
  //     }
  //     this.updateBreadcrumbs(child, `${url}/${routeURL}`, breadcrumbs);
  //   }
  // }

  ngOnInit(): void {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngAfterContentChecked(): void {
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  showSuccessAlert(): void {
    this.showAlert = true;
    this.alertMessage = 'This is a success message!';
    this.alertType = 'alert-success';
  }

  showErrorAlert(): void {
    this.showAlert = true;
    this.alertMessage = 'This is an error message!';
    this.alertType = 'alert-error';
  }

  showWarningAlert(): void {
    this.showAlert = true;
    this.alertMessage = 'This is a warning message!';
    this.alertType = 'alert-warning';
  }

  showInformationAlert(): void {
    this.showAlert = true;
    this.alertMessage = 'This is a Information message!';
    this.alertType = 'alert-info';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Optionally, store the dark mode preference in localStorage
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}
