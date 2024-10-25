import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include CommonModule here
  template: `
    <div class="login-container">
      <div class="login-box">
        <img src="assets/adi.png" alt="Company Logo" class="logo" />
        <!-- Updated path -->
        <h1>Login</h1>
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              required
              minlength="5"
              pattern="[A-Za-z]+"
              #usernameInput="ngModel"
            />
            <div
              *ngIf="usernameInput.invalid && usernameInput.touched"
              class="error-message"
            >
              Username must alphabet and be at least 5 characters long.
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              required
              minlength="6"
              #passwordInput="ngModel"
            />
            <div
              *ngIf="passwordInput.invalid && passwordInput.touched"
              class="error-message"
            >
              Password must be at least 6 characters long.
            </div>
          </div>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            class="login-button"
            [disabled]="loginForm.invalid"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .error-message {
        color: red; /* Style for error messages */
        font-size: 14px; /* Font size for error messages */
        margin-top: 5px; /* Space between input and error message */
      }
    `,
  ],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (
      !this.username ||
      !this.password ||
      this.password.length < 6 ||
      this.username.length < 5
    ) {
      alert('Please fill in the form correctly.');
      return;
    }

    console.log('Username:', this.username);
    console.log('Password:', this.password);

    if (this.username === 'admin' && this.password === 'admin123') {
      this.router.navigate(['/employeeList']);
    } else {
      alert('Login failed! Please check your username or password');
    }
  }
}
