import { UserModel } from './../Models/user-model.model';
import { LoginServiceService } from './../Services/login-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private service:LoginServiceService,private toaster :ToastrService) {

   }
   invalidLogin:boolean;
   user=new UserModel();
   
  ngOnInit() {
    if(localStorage.getItem('Token')!=null && this.checkExpireToken()==true )
    {
      this.router.navigateByUrl('employees');
      this.service.isLoginIn=true;
    }else{
      this.service.isLoginIn=false;
      this.router.navigateByUrl('login');
    }
  }
  checkExpireToken(){
    const decode=jwt_decode(localStorage.getItem('Token'));
    const date=new Date(0);
    let dateExp=date.setUTCSeconds(decode.exp);
    if(dateExp.valueOf()>new Date().valueOf()){
        return true;
    }else{
      return false;
    }
  }
  login(form: NgForm) {
    
    this.service.login(this.user)
    .subscribe(response => {
      const Token = (<any>response).Token;
      localStorage.setItem("Token", Token);
      this.invalidLogin = false;
      this.router.navigate(["employees"]);
      this.service.isLoginIn=true;
      this.toaster.success('Authentification Successufly','welcome to main page');
      const decode=jwt_decode(Token);
      console.log(decode);
    }, err => {
       
       this.invalidLogin=true;
       this.toaster.error("Authentifiation echouue","Authentification echoue");
      
    });
  }
}
