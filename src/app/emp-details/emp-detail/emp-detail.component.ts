import { EmpServiceService } from './../../Services/emp-service.service';
import { Situation } from './../../Models/situation.model';
import { SituationServiceService } from './../../Services/situation-service.service';
import { PosteServiceService } from './../../Services/poste-service.service';
import { PaysServiceService } from '../../Services/pays-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss']
})
export class EmpDetailComponent implements OnInit {

  constructor(private empService:EmpServiceService,private paysService:PaysServiceService, private posteService:PosteServiceService,private situationService:SituationServiceService) { }

  ngOnInit() {
    this.paysService.refreshList();
  }

  private selectedPays;
  private selectedPoste;
  private selectedSit;
  Situation:Situation=new Situation();
  onModelChange(){
    if(this.selectedPays != null){
      
       this.posteService.getPosteByIdPays(this.selectedPays);
       console.log(this.selectedPays);
       this.situationService.situations=null;
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
      this.situationService.getAllByIdPoste(this.selectedPoste);
      console.log(this.selectedPoste);
      
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

validate(from:NgForm){
   this.situationService.validate();
}
  
}
