import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExcelServiceService } from './../../Services/excel-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpServiceService } from './../../Services/emp-service.service';
import { Situation } from './../../Models/situation.model';
import { SituationServiceService } from './../../Services/situation-service.service';
import { PosteServiceService } from './../../Services/poste-service.service';
import { PaysServiceService } from '../../Services/pays-service.service';
import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Employee } from 'src/app/Models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { Pays } from 'src/app/Models/pays.model';
import { Poste } from 'src/app/Models/poste.model';
import { Devise } from 'src/app/Models/devise.model';
import { Fonction } from 'src/app/Models/fonction.model';
import { EmployeeView } from 'src/app/Models/employee-view.model';
import { Categorie } from 'src/app/Models/categorie.model';
import { DeviseServiceService } from 'src/app/Services/devise-service.service';
import { FonctionServiceService } from 'src/app/Services/fonction-service.service';
import { CategorieServiceService } from 'src/app/Services/categorie-service.service';
import { pipe } from 'rxjs';



@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss']
})
export class EmpDetailComponent implements OnInit {

  form: FormGroup;
  employee:EmployeeView=new EmployeeView();
  Nom=new FormControl('',Validators.compose([Validators.required,Validators.minLength(4)]));
  Prenom=new FormControl('',Validators.required);
  dateRecrutement=new FormControl('',Validators.required);
  selectedDevisee=new FormControl('',Validators.required);
  saleD=new FormControl({value:this.employee.SalaireDevise=0, disabled :true},Validators.required ,)

  selectedF=new FormControl(this.employee.IdFonction,Validators.required);
  selectedC=new FormControl(this.employee.IdCategorie,Validators.required)
  gratification=new FormControl(this.employee.Gratification,
    Validators.compose([Validators.required,Validators.min(0)]));
  observation=new FormControl(this.employee.Observation);
  IdEmployee=new FormControl(0);
  salairee=new FormControl({value:this.employee.SalaireDH,disabled:true})

  constructor(private empService:EmpServiceService,private paysService:PaysServiceService, 
    private posteService:PosteServiceService,private situationService:SituationServiceService,
    private toastr :ToastrService,private router : ActivatedRoute,
    private deviseService:DeviseServiceService,
    private fonctionService:FonctionServiceService,
    private categorieService:CategorieServiceService,private excelService:ExcelServiceService,
    private employeeService:EmpServiceService,fb:FormBuilder,private http:HttpClient,private route:Router) {
      this.form = fb.group({
        "IdEmployee":this.IdEmployee,
        "Nom": this.Nom,
        "Prenom":this.Prenom,
        "dateRecrutement":this.dateRecrutement,
        "selectedDevisee":this.selectedDevisee,
        "saleD":this.saleD,
        "selectedF":this.selectedF,
        "selectedC":this.selectedC,
        "gratification":this.gratification,
        "observation":this.observation,
        "salairee":this.salairee,
        });

     }

     
    displayedColumns:string []=['Nom','Prenom','SaleD','SaleDH','grat','dateR','dateD','dateF','actions'];

    @ViewChild(MatSort,{static:true}) sort: MatSort;
     @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;
    lists:any;
    dataSource:MatTableDataSource<Employee>;

   test :boolean;
   show:boolean;
   sit:Situation;

   private selectedDevise;
  pays:Pays=new Pays();
  poste:Poste=new Poste();
  devise:Devise=new Devise();
  salaire:number=0;
  devises:Devise[];
  fonctions:Fonction[];
  categories:Categorie[];
  
  teste:boolean;
  
  export(){
    this.excelService.exportAsExcelFile(this.lists, 'sample');  
  }
  onSubmitModelBased() {
    console.log("model-based form submitted");
    this.employee={
      IdEmployee:0,
      Nom: this.Nom.value,
      Prenom :this.Prenom.value,
      SalaireDH: this.salaire,
      Gratification: this.gratification.value,
      Observation: this.observation.value,
      DateRecrutement: this.dateRecrutement.value,
      IdCategorie :this.selectedC.value,
      IdFonction :this.selectedF.value,
      IdDevise :this.selectedDevise,
      SalaireDevise :this.saleD.value,
      DateDebut :new Date(),
      DateFin :null,
      statut:null,
      Symbole:'',
      NomFonction:'',
      NomCategorie:'',
      IdAffectation:0
    }
    this.empService.addEmployee(this.employee,this.selectedSit).subscribe(
      res=>{
        this.toastr.success('Ajout Avec Success','Employee bien ajoute');
        this.retour();
        this.getLista();
      },
      err=>{
        console.log(err);
      }
    )
   }
   populateForm(emp:EmployeeView){
    console.log(emp);
    this.teste=false;
    this.form.patchValue(
      {
        IdEmployee:emp.IdEmployee,
        Nom: emp.Nom,
        Prenom :emp.Prenom,
        salairee: emp.SalaireDH,
        gratification: emp.Gratification,
        observation: emp.Observation,
        dateRecrutement: emp.DateRecrutement,
        selectedC :emp.IdCategorie,
        selectedF :emp.IdFonction,
        selectedDevisee :emp.IdDevise,
        saleD :emp.SalaireDevise,
        dateD :emp.DateDebut,
        dateF :emp.DateFin
      }

    );
    this.show=true;
      
  
  }
  customers: any;
 
  ngOnInit() {
    
    
    
    this.paysService.refreshList();
    this.show=false;
    if(this.selectedPays !=null && this.selectedPoste!=null && this.selectedSit!=null){
       this.onModelChange();
       this.onPosteChange();
       this.onSitChange();
    }else{
      console.log("null")
    }
    this.getDevise();
    this.getFonctions();
    this.getCategories();
    this.teste=true;
    this.form.get('selectedDevisee').valueChanges.subscribe(value=>
      { 
         this.selectedDevise=value;
         if(value !=null){
          this.deviseService.getDevise(value).subscribe(
            (devise:any)=>{
             this.devise=devise;
             this.teste=false;
             this.form.controls['saleD'].enable();
             console.log(this.test)
             this.onKey(this.saleD.value);
            },
            err=>{
              console.log(err);
            }
          )
         }
         
      });
     
  }

   private selectedPays;
   private selectedPoste;
   private selectedSit;
   Situation:Situation=new Situation();
   list:Situation[];
   error:any={isError:false,errorMessage:''};

   compareTwoDates(){
    if(new Date()<new Date(this.form.controls['dateRecrutement'].value)){
      
       this.form.controls['dateRecrutement'].setErrors({'incorrect': true});
      
    }else{
      this.error={isError:false,errorMessage:''};
      this.form.controls['dateRecrutement'].setErrors(null);
    }
 }
  onModelChange(){
    this.show=false;
    if(this.selectedPays != null){
      
       this.posteService.getPosteByIdPays(this.selectedPays);
       this.getPays();
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
      this.getPoste();
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
  onDelete(emp:EmployeeView){
    if(confirm("Voulez vous supprimez ?"))
    {
      this.empService.deleteEmployee(emp.IdAffectation).subscribe(
        res =>{
          this.getLista()
          this.toastr.warning('Suppression Avec Success','Employee bien supprime');
        },
        err=>{
          console.log(err);
        }
      )
    }
  }
  onSitChange(){
     if(this.selectedSit!=null){
      
       this.situationService.getOneSituation(this.selectedSit).subscribe((situation :any)=>{
        if(situation){
            this.Situation=situation;
            console.log(this.Situation.IdSituation);
            this.getLista();
            
        }
       
     });
   
  }
}
getLista(): void {
  this.empService.get(this.Situation.IdSituation).subscribe(lista => {
    this.lists = lista;
    console.log(this.lists);
    this.dataSource = new MatTableDataSource(this.lists);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
   
});
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


getColor(){
  if(this.salairee.value===0){
    return "red";
  }else
  {
    return "green";
  }
}
reset(){
  this.form.reset();
  this.form.controls['saleD'].disable();
}
retour(){
  this.show=false;
  this.form.reset();
  this.form.controls['saleD'].disable();
  this.getLista()
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
  this.paysService.getPays(this.selectedPays).subscribe(
    (pays :any)=>{
      this.pays=pays;
    },
    err=>{
      console.log(err);
    }
  )
}

getPoste(){
  this.posteService.getPoste(this.selectedPoste).subscribe(
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
onDeviseChange(event :any){
  
  /*this.form.controls['selectedDevisee'].valueChanges.subscribe((value) => {
    if(value!= null){
      this.deviseService.getDevise(value).subscribe(
        (devise:any)=>{
         this.devise=devise;
         this.teste=false;
         console.log(this.test)
         this.onKey(this.salD);
        },
        err=>{
          console.log(err);
        }
      )
   }
    
  });*/
  
  
  
}
onKey(value:number){
  if(this.devise!=null){
    this.salaire=value*this.devise.ChangeDH;
    this.form.controls['salairee'].setValue(this.salaire);
    console.log(this.form.controls['salairee'].value);
    
  }else{
    this.form.controls['salairee'].setValue(this.saleD.value);
    console.log(this.salD);
  }
}
onSubmit(){
   this.employee.IdDevise=this.selectedDevise;
   this.employee.SalaireDH=this.salaire;
   this.employee.SalaireDevise=this.salD;
   this.employeeService.addEmployee(this.employee,this.selectedSit).subscribe(
     res=>{
       console.log("goood");
       this.show=false;
       this.getLista();
     },
     err=>{
       console.log(err);
     }
   );
}


  
}
