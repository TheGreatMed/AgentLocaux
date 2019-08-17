import { PosteListComponent } from './../poste-details/poste-list/poste-list.component';

import { Injectable, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Poste } from '../Models/poste.model';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Injectable({
  providedIn: 'root'
})
export class PosteServiceService {

  postes:Poste[];
  poste:Poste=new Poste();
  test :Boolean;
  constructor(private http:HttpClient) {

   }
   PostPoste(){
    return  this.http.post('http://localhost:61823/api/Poste/',this.poste);
   }
   DeleteEmployee(id){
    return  this.http.delete('http://localhost:61823/api/Poste/'+id);
   }
   PutPoste(){
     console.log(this.poste.IdPoste);
    return  this.http.put('http://localhost:61823/api/Poste/'+this.poste.IdPoste,this.poste);
   }
   getPosteByIdPays(id:number){
    this.http.get('http://localhost:61823/api/Poste/find/'+id)
    .toPromise()
    .then(res => this.postes= res as Poste[]);
  }
  dataSource:MatTableDataSource<Poste>;
  liste:Poste[];
  //@ViewChild(MatSort,{static:true}) sort: MatSort;
//@ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;
  //@ViewChild(MatSort,{static:false} ) private sort: MatSort;
 
  getAll():Observable<Poste[]> {
    return this.http.get<Poste[]>('http://localhost:61823/api/Poste')
  }
  

}
