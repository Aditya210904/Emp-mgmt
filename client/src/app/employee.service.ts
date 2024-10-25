import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://your-api-url.com/api';

  constructor(private http: HttpClient) {}

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/${id}`);
  }

  updateEmployee(id: string, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/employees/${id}`, employee);
  }
}
