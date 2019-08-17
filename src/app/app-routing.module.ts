import { PosteDetailsComponent } from './poste-details/poste-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpDetailsComponent } from './emp-details/emp-details.component';

const routes: Routes = [
{path :'', component : EmpDetailsComponent},
{path:'Postes', component:PosteDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
