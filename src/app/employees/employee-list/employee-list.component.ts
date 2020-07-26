import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import {NotificationService} from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private eservice : EmployeeService , 
              private dialog : MatDialog,
              private notificationservice : NotificationService,
              private dialogService : DialogService) { }

  listData :MatTableDataSource<any>;
  displayedColumns : string[] = ['fullName', 'email', 'mobile', 'city','hireDate','action'];
  @ViewChild(MatSort) sort :MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey : string;

  ngOnInit(): void {
    this.eservice.getEmloyees().subscribe(list =>{
      let array = list.map(item =>{
        return{
          $key : item.key,
          ...item.payload.val()
        }
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
      
    )
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.listData.filter = filterValue.trim().toLowerCase();

  //   if (this.listData.paginator) {
  //     this.listData.paginator.firstPage();
  //   }
  // }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  clearsearch(){
    this.searchKey='';
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.eservice.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent , dialogConfig);
  }

  onEdit(row){
    this.eservice.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent , dialogConfig);
  }

  onDelete($key){
    // if(confirm("Are you sure to delete this record?"))
    //  this.eservice.deleteEmployee($key);
    //  this.notificationsrvice.warn("! Deleted Successfuly .")
    this.dialogService.openConfirmDialog("Are you sure to delete this record?")
    .afterClosed().subscribe(res => {
      if(res){
        this.eservice.deleteEmployee($key);
        this.notificationservice.warn("! Deleted Successfuly .")
      }
    });
     
  }
  
}


