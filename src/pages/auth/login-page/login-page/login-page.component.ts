import { Component } from '@angular/core';
import { SingleFocusLayoutComponent } from '../../../../shared/components/single-focus-layout/single-focus-layout/single-focus-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [SingleFocusLayoutComponent,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}


