import { Injectable } from '@angular/core';
import {AngularFireDatabase , AngularFireList} from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList : AngularFireList<any>;
  arrayDepartment =[];

  constructor(private firebase : AngularFireDatabase) { 
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.arrayDepartment = list.map(item => {
          return {
            $key : item.key ,
            ...item.payload.val()
          }
        })
      }
    )
  }
}
