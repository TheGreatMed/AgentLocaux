import { SituationServiceService } from './../../Services/situation-service.service';
import { PosteServiceService } from './../../Services/poste-service.service';
import { PaysServiceService } from '../../Services/pays-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss']
})
export class EmpDetailComponent implements OnInit {

  constructor(private paysService:PaysServiceService, private posteService:PosteServiceService,private situationService:SituationServiceService) { }

  ngOnInit() {
    this.paysService.refreshList();
  }

  private selectedPays;
  private selectedPoste;
  
  onModelChange(){
    if(this.selectedPays != null){
       this.posteService.getPosteByIdPays(this.selectedPays);
       console.log(this.selectedPays);
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

}
