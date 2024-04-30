import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFilterComponent } from '../../../features/search-filter/search-filter/search-filter.component';

@Component({
  selector: 'app-search-customer',
  standalone: true,
  imports: [
    CommonModule,
    SearchFilterComponent
  ],
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCustomerComponent { }
