import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { PosteDetailsComponent } from './poste-details/poste-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { EmpFormComponent } from './emp-details/emp-form/emp-form.component';

const routes: Routes = [
{path:'home',component:HomeComponent,canActivate: [AuthGuardService]},
{path:'login',component:LoginComponent },
{path:'employees',component:EmpDetailsComponent ,canActivate: [AuthGuardService]},
{path:'Postes', component:PosteDetailsComponent,canActivate: [AuthGuardService]},
{path :'employees/:id',component :EmpFormComponent ,canActivate: [AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
