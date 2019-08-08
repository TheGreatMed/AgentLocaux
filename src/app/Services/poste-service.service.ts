import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Poste } from '../Models/poste.model';
@Injectable({
  providedIn: 'root'
})
export class PosteServiceService {

  postes:Poste[];
  constructor(private http:HttpClient) {

   }
   getPosteByIdPays(id:number){
    this.http.get('http://localhost:61823/api/Poste/find/'+id)
    .toPromise()
    .then(res => this.postes= res as Poste[]);
  }
}
