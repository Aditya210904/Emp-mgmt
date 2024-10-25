import { Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { LoginPage } from './login-page/login';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'employeeList/new', component: AddEmployeeComponent },
  { path: 'edit/:id', component: EditEmployeeComponent },
  { path: 'login', component: LoginPage },
  { path: 'employeeList', component: EmployeesListComponent, title: 'Employees List' }
];
