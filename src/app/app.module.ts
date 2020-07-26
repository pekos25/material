import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { MatComponentsModule} from './mat-components/mat-components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { environment } from 'src/environments/environment';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import {DatePipe} from '@angular/common';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatComponentsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent, MatConfirmDialogComponent]
})
export class AppModule { }
