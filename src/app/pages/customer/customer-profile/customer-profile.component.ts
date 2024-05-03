import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header/header.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '../../../shared/components/menu-bar/menu-bar.component';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, RouterOutlet, MenuBarComponent],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {

}
