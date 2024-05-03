import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import test from 'node:test';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  enableSubmit: boolean = false;
  submitButtonClass: string = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  checkInputs(): void {
    if (this.username.trim() !== '' && this.password.trim() !== '') {
      this.enableSubmit = true;
      this.submitButtonClass = 'active'; 
    } else {
      this.enableSubmit = false;
      this.submitButtonClass = ''; 
    }
  }
}
