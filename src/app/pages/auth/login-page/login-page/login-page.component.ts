import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFocusLayoutComponent } from '../../../../shared/layouts/single-focus-layout/single-focus-layout/single-focus-layout.component';
import { LoginFormComponent } from '../../../../features/auth/components/login-form/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [SingleFocusLayoutComponent, CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}


