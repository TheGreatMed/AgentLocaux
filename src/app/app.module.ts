import { EmpServiceService } from './Services/emp-service.service';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';

import { EmpDetailComponent } from './emp-details/emp-detail/emp-detail.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';


import {PaysServiceService} from './Services/pays-service.service';
import {PosteServiceService} from './Services/poste-service.service';
import { SituationServiceService } from './Services/situation-service.service';
import { PosteDetailsComponent } from './poste-details/poste-details.component';
import { PosteDetailComponent } from './poste-details/poste-detail/poste-detail.component';
import { PosteListComponent } from './poste-details/poste-list/poste-list.component';
import { EmpFormComponent } from './emp-details/emp-form/emp-form.component';



@NgModule({
  declarations: [
    AppComponent,
    EmpDetailsComponent,
    EmpDetailComponent,
    PosteDetailsComponent,
    PosteDetailComponent,
    PosteListComponent,
    EmpFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatPaginatorModule,
    ToastrModule.forRoot()
    
  ],
  providers: [PaysServiceService,PosteServiceService,SituationServiceService,EmpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
