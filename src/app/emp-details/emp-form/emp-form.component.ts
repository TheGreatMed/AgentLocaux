import { EmpServiceService } from './../../Services/emp-service.service';
import { CategorieServiceService } from './../../Services/categorie-service.service';
import { Categorie } from './../../Models/categorie.model';
import { FonctionServiceService } from './../../Services/fonction-service.service';
import { DeviseServiceService } from './../../Services/devise-service.service';
import { SituationServiceService } from './../../Services/situation-service.service';
import { PosteServiceService } from './../../Services/poste-service.service';
import { PaysServiceService } from './../../Services/pays-service.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pays } from 'src/app/Models/pays.model';
import { Poste } from 'src/app/Models/poste.model';
import { Devise } from 'src/app/Models/devise.model';
import { EmployeeView } from 'src/app/Models/employee-view.model';
import { Fonction } from 'src/app/Models/fonction.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit {

  constructor(private paysService:PaysServiceService, 
    private posteService:PosteServiceService,
    private situationService:SituationServiceService,
    private deviseService:DeviseServiceService,
    private fonctionService:FonctionServiceService,
    private categorieService:CategorieServiceService,private employeeService:EmpServiceService,
    private route:ActivatedRoute,private toastr : ToastrService) { }

   @Input() IdPays :number;
   @Input() IdPoste:number;
   @Input() IdSituation:number;
   
   private selectedDevise;
  pays:Pays=new Pays();
  poste:Poste=new Poste();
  devise:Devise;
  salaire:number=0;
  devises:Devise[];
  fonctions:Fonction[];
  categories:Categorie[];
  employee:EmployeeView=new EmployeeView();
  test:boolean;

  ngOnInit() {
    this.getPays();
    this.getPoste();
    this.getDevise();
    this.getFonctions();
    this.getCategories();
    this.test=true;
  }
  getColor(){
    if(this.salaire===0){
      return "red";
    }else
    {
      return "green";
    }
  }
  
  getCategories(){
     this.categorieService.getCategories().subscribe(
       (categories:any)=>{
         this.categories=categories;
       },
       err=>{
         console.log(err);
       }
     )
  }

  getFonctions(){
     this.fonctionService.getFonctions().subscribe(
       (fonctions:any)=>{
         this.fonctions=fonctions;
       },
       err=>{
         console.log(err);
       }
     )
  }

  getPays(){
    this.paysService.getPays(this.IdPays).subscribe(
      (pays :any)=>{
        this.pays=pays;
      },
      err=>{
        console.log(err);
      }
    )
  }

  getPoste(){
    this.posteService.getPoste(this.IdPoste).subscribe(
      (poste:any)=>{
       this.poste=poste;
      },
      err=>{
       console.log(err);
      }
    )
  }

  getDevise(){
    this.deviseService.getDevises().subscribe(
      (devise:any)=>{
        this.devises=devise
      }
    )
  }

  salD:number=0;
  onDeviseChange(){
    if(this.selectedDevise != null){
       this.deviseService.getDevise(this.selectedDevise).subscribe(
         (devise:any)=>{
          this.devise=devise;
          this.test=false;
          console.log(this.test)
          this.onKey(this.salD);
         },
         err=>{
           console.log(err);
         }
       )
    }
  }
  onKey(value:number){
    if(this.devise!=null){
      this.salaire=value*this.devise.ChangeDH;
      this.salD=value;
    }else{
      this.salaire=value;
      this.salD=value;
      console.log(this.salD);
    }
  }
  onSubmit(form:NgForm){
     this.employee.IdDevise=this.selectedDevise;
     this.employee.SalaireDH=this.salaire;
     this.employee.SalaireDevise=this.salD;
     this.employeeService.addEmployee(this.employee,this.IdSituation).subscribe(
       res=>{
         console.log("goood");
       },
       err=>{
         console.log(err);
       }
     );
  }
}
