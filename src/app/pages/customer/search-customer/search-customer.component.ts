import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFilterComponent } from '../../../features/customers/components/search-filter/search-filter/search-filter.component';
import { SearchResultsComponent } from '../../../features/customers/components/search-result/search-results/search-results.component';

@Component({
  selector: 'app-search-customer',
  standalone: true,
  imports: [
    CommonModule,
    SearchResultsComponent,
    SearchFilterComponent
  ],
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCustomerComponent { }
