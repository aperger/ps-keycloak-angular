import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CompaniesComponent } from "./components/companies/companies.component";
import { UsersComponent } from "./components/users/users.component";
import { SitesComponent } from './components/sites/sites.component';
import { MeasuringPointsComponent } from './components/measuring-points/measuring-points.component';
import { MeasuredParametersComponent } from './components/measured-parameters/measured-parameters.component';
import { PhysicalAttributesComponent } from './components/physical-attributes/physical-attributes.component';
import { MeasuredDataComponent } from './components/measured-data/measured-data.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], },
  { path: 'cegek', component: CompaniesComponent, canActivate: [AuthGuard], },
  { path: 'telephelyek', component: SitesComponent, canActivate: [AuthGuard], },
  { path: 'meresi-pontok', component: MeasuringPointsComponent, canActivate: [AuthGuard], },
  { path: 'meresi-parameterek', component: MeasuredParametersComponent, canActivate: [AuthGuard], },
  { path: 'fizikai-jellemzok', component: PhysicalAttributesComponent, canActivate: [AuthGuard], },
  { path: 'felhasznalok', component: UsersComponent, canActivate: [AuthGuard], },
  { path: 'mert-adatok', component: MeasuredDataComponent, canActivate: [AuthGuard], },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
