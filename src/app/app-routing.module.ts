import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpDetailsComponent } from './emp-details/emp-details.component';

const routes: Routes = [
{path :'', component : EmpDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
