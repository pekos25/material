import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
// import { EmployeeService } from 'src/app/shared/employee.service';
import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public eservice :EmployeeService ,
             public departmentService : DepartmentService , 
             private notificationServ : NotificationService ,
             private dialogRef : MatDialogRef<EmployeeComponent>) { }
//treba promeniti public u private za eservice
 departments = [
   {id: 1 , value : "Dep 1"},
   {id: 2 , value : "Dep 2"},
   {id: 3 , value : "Dep 3"}
 ]

  ngOnInit(): void {
    this.eservice.getEmloyees();
  }

  onClear(){
    this.eservice.form.reset();
    this.eservice.initializeFormGroup();
    this.notificationServ.clearForm(':: The form has been deleted')
  }

  onSubmit(){
    if(this.eservice.form.valid){
      if(!this.eservice.form.get('$key').value)
          this.eservice.insertEmployee(this.eservice.form.value)
      else 
          this.eservice.updateEmployee(this.eservice.form.value);
      this.eservice.form.reset();
      this.eservice.initializeFormGroup();
      this.notificationServ.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose(){
    this.eservice.form.reset();
    this.eservice.initializeFormGroup();
    this.dialogRef.close();
  }
}
