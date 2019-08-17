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

  getAllByIdPoste(id){
    this.http.get('http://localhost:61823/api/Situation/find/'+id)
    .toPromise()
    .then(res => this.situations= res as Situation[]);
  }

  getOneSituation(id){
    return this.http.get('http://localhost:61823/api/Situation/'+id)
    }
    
  validate(){
    return this.http.put('http://localhost:61823/api/Situation/valide/'+this.situation.IdSituation,this.situation);
  }
}
