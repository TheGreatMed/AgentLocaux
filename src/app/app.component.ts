import { LoginServiceService } from './Services/login-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(private route:Router,private service:LoginServiceService,private toaster:ToastrService){

  }
  
  ngOnInit() {
    if(localStorage.getItem('Token')!=null && this.checkExpireToken()==true )
    {
      this.route.navigateByUrl('employees');
      this.service.isLoginIn=true;
    }else{
      this.service.isLoginIn=false;
      this.route.navigateByUrl('login');
    }
  }

  logOut() {
    localStorage.removeItem("Token");
    this.route.navigate(['login']);
    this.service.isLoginIn=false;
    this.toaster.success('Deconnexion avec succuee','Deconnexion avec succees');
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
}
