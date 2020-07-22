import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private eservice : EmployeeService) { }

  listData :MatTableDataSource<any>;
  displayedColumns : string[] = ['fullName', 'email', 'mobile', 'city','action'];
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

  
}


