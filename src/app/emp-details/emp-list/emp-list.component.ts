import { EmpServiceService } from './../../Services/emp-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {

  constructor(private empService:EmpServiceService) { }

  ngOnInit() {
    
  }

}
