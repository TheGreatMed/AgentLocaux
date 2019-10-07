import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviseServiceService {

  constructor(private http:HttpClient) { 

  }
   
  getDevises(){
    return this.http.get('http://localhost:61823/api/Devise');
  }
 
  getDevise(id){
    return this.http.get('http://localhost:61823/api/Devise/'+id);
  }
}
