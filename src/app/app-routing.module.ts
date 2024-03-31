import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {NavigationComponent} from './navigation/navigation.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {CompaniesComponent} from "./companies/companies.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],},
  {path: 'cegek', component: CompaniesComponent, canActivate: [AuthGuard],},
  {path: 'felhasznalok', component: UsersComponent, canActivate: [AuthGuard],},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
