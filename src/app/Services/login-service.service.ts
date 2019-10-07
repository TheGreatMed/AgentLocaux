import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  isLoginIn=false;
  
  constructor(private http:HttpClient) { 

  }

  login(formData){
    return this.http.post("http://localhost:61823/api/auth/login", formData);
  }


}
