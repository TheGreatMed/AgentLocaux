import { PosteListComponent } from './../poste-list/poste-list.component';
import { PaysServiceService } from './../../Services/pays-service.service';
import { PosteServiceService } from './../../Services/poste-service.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Poste } from 'src/app/Models/poste.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poste-detail',
  templateUrl: './poste-detail.component.html',
  styleUrls: ['./poste-detail.component.scss']
})
export class PosteDetailComponent implements OnInit {

  displayedColumns:string []=['NomPoste','CodePoste','VillePost','actions'];

@ViewChild(MatSort,{static:true}) sort: MatSort;
@ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;
liste:Poste[]
dataSource:MatTableDataSource<Poste>;
  constructor(private posteService:PosteServiceService,private paysService:PaysServiceService,
    private toastr : ToastrService) { 

  }
  
  ngOnInit() {
    this.resetForm();
    this.paysService.refreshList();
    this.posteService.test=false;
    this.getLista();
    
  }

  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();   
    this.posteService.poste ={
     IdPoste:0,
     NomPoste:'',
     VillePost:'',
     CodePoste:'',
     TypePoste:'',
     IdPays:null
    };
  }
  updateRecord(form :NgForm){
    this.posteService.PutPoste().subscribe(
      res => {
        this.resetForm(form);
       this.toastr.info('Modification Avec Success','Poste bien modifie');
        this.getLista()
        this.posteService.test=false;
      },
      err =>{
        console.log(err);
      }
    );
  }
  inserRecord(form :NgForm){
    
    this.posteService.PostPoste().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Ajout Avec Success','Poste bien ajoute');
        this.getLista();
      },
      err =>{
        console.log(err);
      }
    );
  }
  onSubmit(form : NgForm){
   
    if(this.posteService.poste.IdPoste==0)
    {
        this.inserRecord(form);
      
    }else{
         this.updateRecord(form);
    }
  }
  onEfface(form :NgForm){
    this.resetForm(form);
    this.posteService.test=false;
  }

  getLista(): void {
    this.posteService.getAll().subscribe(lista => {
      this.liste = lista;
      console.log(this.liste);
      this.dataSource = new MatTableDataSource(this.liste);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
     
  });
    
  }
  populateForm(poste:Poste){
    console.log(poste.IdPays);
    this.posteService.poste=Object.assign({},poste);
    this.posteService.test=true;
  }
  onDelete(poste){
     if(confirm("Voulez vous supprimez ?"))
    {
      this.posteService.DeleteEmployee(poste.IdPoste).subscribe(
        res =>{
          this.getLista();
          this.toastr.warning('Suppression Avec Success','Poste bien supprime');
        },
        err=>{
          console.log(err);
        }
      )
    }}
}
