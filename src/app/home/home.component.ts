import { LoginServiceService } from './../Services/login-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  test:boolean
  constructor(private route:Router,private service:LoginServiceService,private toaster:ToastrService) { }
  
  ngOnInit() {
    
  }
  logOut() {
    localStorage.removeItem("Token");
    this.route.navigate(['login']);
    this.service.isLoginIn=false;
    this.toaster.success('Deconnexion avec succuee','Deconnexion avec succees');
  }
}
