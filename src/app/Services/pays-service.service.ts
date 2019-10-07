import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Pays } from '../Models/pays.model';

@Injectable({
  providedIn: 'root'
})
export class PaysServiceService {

  liste: Pays[];
  constructor(private http:HttpClient) { 

  }
  refreshList(){
    this.http.get('http://localhost:61823/api/Pays')
    .toPromise()
    .then(res => this.liste= res as Pays[]);
  }

  getPays(id){
    return this.http.get('http://localhost:61823/api/Pays/'+id);
  }
}
