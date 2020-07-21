import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from 'src/app/shared/employee.service';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public eservice :EmployeeService) { }
//treba promeniti public u private za eservice
 departments = [
   {id: 1 , value : "Dep 1"},
   {id: 2 , value : "Dep 2"},
   {id: 3 , value : "Dep 3"}
 ]

  ngOnInit(): void {
  }

  onClear(){
    this.eservice.form.reset();
    this.eservice.initializeFormGroup();
  }

}
