import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {

  constructor(private http:HttpClient) {

   }

   getCategories(){
    return this.http.get('http://localhost:61823/api/Categorie');
   }
}
