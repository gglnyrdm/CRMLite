import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SingleFocusLayoutComponent } from './shared/layouts/single-focus-layout/single-focus-layout/single-focus-layout.component';
import { SearchCustomerComponent } from './pages/customer/search-customer/search-customer.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SingleFocusLayoutComponent,SearchCustomerComponent,MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CRMLite';
}
