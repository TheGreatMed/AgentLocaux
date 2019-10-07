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
    return this.http.get('http://localhost:61823/api/Employee/affect/'+id);
   }

   addEmployee(employee:Employee,id){
     return this.http.put('http://localhost:61823/api/Employee/add/'+id,employee);
   }

   deleteEmployee(id){
    return this.http.delete('http://localhost:61823/api/Employee/'+id);
   }
}
