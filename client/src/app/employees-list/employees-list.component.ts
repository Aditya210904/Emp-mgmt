import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>(this.employees);

  constructor(
    private employeesService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getEmployee().subscribe((employees) => {
      this.employees = employees;
      this.dataSource.data = this.employees; // Set data for MatTableDataSource
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateEmployee(result);
      }
    });
  }

  updateEmployee(employee: Employee): void {
    this.employeesService.updateEmployee(employee).subscribe(() => {
      this.getEmployees(); // Refresh the list after update
    });
  }

  confirmDelete(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEmployee(employee.id);
      }
    });
  }

  deleteEmployee(id: string): void {
    this.employeesService.deleteEmployee(id).subscribe(() => {
      this.getEmployees(); // Refresh the list after deletion
    });
  }
}
