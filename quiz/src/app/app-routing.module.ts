import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:'full' },
  {path: 'home', component:HomeComponent},
  {path:'register', component:RegisterComponent },
  {path:'login', component:LoginComponent},
  {path: 'profile', component:ProfileComponent},
  { path: 'users/edit/:id', component: RegisterComponent },
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  // {
    // scrollPositionRestoration: 'enabled',
    // anchorScrolling: 'enabled'
  // },
  exports: [RouterModule]
})
export class AppRoutingModule { }
