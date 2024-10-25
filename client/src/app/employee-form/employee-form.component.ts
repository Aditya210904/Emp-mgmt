import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .employee-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="employee-form"
      autocomplete="off"
      [formGroup]="employeeForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Position</mat-label>
        <input matInput placeholder="Position" formControlName="position" />
      </mat-form-field>

      <mat-radio-group formControlName="level" aria-label="Select an option">
        <mat-radio-button name="level" value="junior">Junior</mat-radio-button>
        <mat-radio-button name="level" value="mid">Mid</mat-radio-button>
        <mat-radio-button name="level" value="senior">Senior</mat-radio-button>
      </mat-radio-group>
      <br />
      <button mat-raised-button color="primary" type="submit">Add</button>
    </form>
  `,
})
export class EmployeeFormComponent {
  @Output() formValuesChanged = new EventEmitter<Employee>();
  @Output() formSubmitted = new EventEmitter<Employee>();

  employeeForm = this.formBuilder.group({
    name: [''],
    position: [''],
    level: ['junior'],
  });

  constructor(private formBuilder: FormBuilder) {}

  submitForm() {
    this.formSubmitted.emit(this.employeeForm.value as Employee);
  }
}
