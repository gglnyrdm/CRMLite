import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-customer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCustomerComponent { }
