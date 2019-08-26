import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss']
})
export class EmpDetailsComponent implements OnInit {

  @Output() myOutput = new EventEmitter();
  constructor() { }
  
  ngOnInit() {
  }

}
