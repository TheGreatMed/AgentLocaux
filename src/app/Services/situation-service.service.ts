import { Situation } from './../Models/situation.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class SituationServiceService {

  constructor(private http:HttpClient) { 

  }

  situations:Situation[];
  situation:Situation= new Situation();
  emp:Employee
   idS:number;
   Liste:[];
  getAllByIdPoste(id){
   return this.http.get('http://localhost:61823/api/Situation/find/'+id)
    
  }

  getOneSituation(id){
    return this.http.get('http://localhost:61823/api/Situation/'+id)
    }
    
  validate(id){
    
    return this.http.get('http://localhost:61823/api/Situation/valide/'+id)
  }

  postSituation(id){
    this.situation.IdPoste=id;
    return this.http.put('http://localhost:61823/api/Situation/Add/'+id,this.situation);
  }
}
