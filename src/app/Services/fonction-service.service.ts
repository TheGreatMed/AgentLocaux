import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FonctionServiceService {

  constructor(private http:HttpClient) {

   }

   getFonctions(){
     return this.http.get('http://localhost:61823/api/Fonction');
   }

}
