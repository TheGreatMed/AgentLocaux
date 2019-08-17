import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  employees:Employee[];
  constructor(private http: HttpClient) {

   }

    get(id){
     this.http.get('http://localhost:61823/api/Employee/affect/'+id)
     .toPromise()
     .then(res => this.employees= res as Employee[]);
   }
}
