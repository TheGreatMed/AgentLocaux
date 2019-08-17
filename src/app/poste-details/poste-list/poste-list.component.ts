
import { PosteServiceService } from './../../Services/poste-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Poste } from 'src/app/Models/poste.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { fromEvent } from 'rxjs';
import { MatSort } from '@angular/material/sort';
 
@Component({
  selector: 'app-poste-list',
  templateUrl: './poste-list.component.html',
  styleUrls: ['./poste-list.component.scss'] 
}) 
export class PosteListComponent implements OnInit {
 
 
  constructor(private posteService :PosteServiceService) { 
    
    
  }

  ngOnInit() {
   
   
    
  }
  
  
}
