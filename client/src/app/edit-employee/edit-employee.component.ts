import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../employee';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [EmployeeFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit Employee</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-employee-form
          [employee]="employee"
          (formSubmitted)="updateEmployee($event)"
        ></app-employee-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee;
  employeeId: string; // Store employee id here

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!; // Store id from route
    this.employeeService.getEmployee(this.employeeId).subscribe((employee: Employee) => {
      this.employee = employee;
    });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(this.employeeId, employee).subscribe({
      next: () => {
        this.router.navigate(['employeeList']);
      },
      error: (error) => {
        alert('Failed to update employee');
        console.error(error);
      },
    });
  }
}
