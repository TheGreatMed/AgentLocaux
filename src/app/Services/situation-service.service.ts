import { Situation } from './../Models/situation.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SituationServiceService {

  constructor(private http:HttpClient) { 

  }

  situations:Situation[];
  situation:Situation= new Situation();
   idS:number;
   Liste:[];
  getAllByIdPoste(id){
    this.http.get('http://localhost:61823/api/Situation/find/'+id)
    .toPromise()
    .then(res => this.situations= res as Situation[]);
    console.log(this.situations)
    
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
