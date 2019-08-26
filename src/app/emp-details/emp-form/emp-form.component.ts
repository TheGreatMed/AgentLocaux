import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit {

  constructor() { }
   @Input() IdPays :number;
   @Input() IdPoste:number;
   @Input() IdSituation:number;
  ngOnInit() {
  }

}
