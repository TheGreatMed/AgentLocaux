import { ToastrService } from 'ngx-toastr';
import { EmpServiceService } from './../../Services/emp-service.service';
import { Situation } from './../../Models/situation.model';
import { SituationServiceService } from './../../Services/situation-service.service';
import { PosteServiceService } from './../../Services/poste-service.service';
import { PaysServiceService } from '../../Services/pays-service.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { EmpFormComponent } from '../emp-form/emp-form.component';



@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss']
})
export class EmpDetailComponent implements OnInit {

  constructor(private empService:EmpServiceService,private paysService:PaysServiceService, 
    private posteService:PosteServiceService,private situationService:SituationServiceService,
    private toastr :ToastrService,private dialog:MatDialog) { }
   test :boolean;
   show:boolean
  ngOnInit() {
    this.paysService.refreshList();
    this.show=false;
  }

   private selectedPays;
   private selectedPoste;
   private selectedSit;
   Situation:Situation=new Situation();
   list:Situation[];
  onModelChange(){
    if(this.selectedPays != null){
      
       this.posteService.getPosteByIdPays(this.selectedPays);
       console.log(this.selectedPays);
       this.list=null;
       this.selectedSit=null;
       this.selectedPoste=null;
       this.Situation.Etat=null;
       this.Situation.IdSituation=null;
    }else{
      
      console.log(this.selectedPays);
    }
  }
 
  onPosteChange(){
    if(this.selectedPoste !=null){
      this.situationService.getAllByIdPoste(this.selectedPoste).subscribe(
        (sits:any)=>{
           this.list=sits;
           console.log(this.list);
           if(this.list!=null){
            this.list.forEach(
              res=>{
                if(res.Etat=="En cours de modification"){
                  this.test=true;
                } else{
                  this.test=false;
                }      
                 
              }      
            )
           }else{
             this.test=false;
           }
           console.log(this.test)
        },
        err=>{
          console.log(err);
        }
      )
     
       
       this.selectedSit=null;
       this.Situation.Etat=null;
       this.Situation.IdSituation=null;
      
    }
  }
  
  onSitChange(){
     if(this.selectedSit!=null){
      
       this.situationService.getOneSituation(this.selectedSit).subscribe((situation :any)=>{
        if(situation){
            this.Situation=situation;
            console.log(this.Situation.IdSituation);
            this.empService.get(this.Situation.IdSituation);
            
            
        }
       
     });
   
  }
}

validate(){
  
   this.situationService.validate(this.Situation.IdSituation).subscribe(
    res=>{
     
      this.onSitChange();
      this.test=false;
    },
    err=>{
      console.log(err);
    }
  );;
}
AddSituation(){
   this.situationService.postSituation(this.selectedPoste).subscribe(
     res=>{
      this.toastr.success('Ajout Avec Success','situation bien ajoute');
        this.onPosteChange();
        this.test=false;
     },
     err=>{
       console.log(err);
     }
   )
}

onCreate(){
 this.show=true;
}
  
}
