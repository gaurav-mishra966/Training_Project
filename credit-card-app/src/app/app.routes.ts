import { Routes, RouterModule } from '@angular/router';
import { HomecomponentComponent } from './components/homecomponent/homecomponent.component';
import { AdmincomponentComponent } from './components/admincomponent/admincomponent.component';
import { LoginComponent } from './components/common-components/login/login.component';
import { ProductsComponent } from './components/common-components/products/products.component';
import { CommondashboardComponent } from './components/common-components/commondashboard/commondashboard.component';
import { UserManagementComponent } from './components/adminComponents/user-management/user-management.component';
import { AddproductComponent } from './components/common-components/addproduct/addproduct.component';
import { AuthGaurd } from './gaurds/auth.guard';
import { AppComponent } from './app.component';
import { AdminsettingsComponent } from './components/adminComponents/adminsettings/adminsettings.component';
import { ProfilesectionComponent } from './components/common-components/profilesection/profilesection.component';
import { NewpageUnderconstructionComponent } from './components/common-components/newpage-underconstruction/newpage-underconstruction.component';
import { UpdatepasswordComponent } from './components/common-components/updatepassword/updatepassword.component';
import { ServicesofferedComponent } from './components/adminComponents/servicesoffered/servicesoffered.component';
import { AddservicesofferedComponent } from './components/adminComponents/addservicesoffered/addservicesoffered.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: CommondashboardComponent },
  { path: 'profile', component: ProfilesectionComponent },
  {
    path: 'admin-dashboard',
    component: AdmincomponentComponent,
    // canActivate: [AuthGaurd],
  },
  { path: 'settings', component: AdminsettingsComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'user-dashboard', component: HomecomponentComponent },

  { path: 'products', component: ProductsComponent },
  { path: 'changePassword', component: UpdatepasswordComponent },

  //Product Section
  { path: 'add-product', component: AddproductComponent },
  { path: 'edit-Product/:id', component: AddproductComponent },

  //Services Section
  { path: 'services', component: ServicesofferedComponent },
  { path: 'edit-service/:id', component: AddservicesofferedComponent },

  //Common Sections
  { path: 'enquiry', component: NewpageUnderconstructionComponent },
];
