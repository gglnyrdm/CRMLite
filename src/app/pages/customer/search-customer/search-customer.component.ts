import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFilterComponent } from '../../../features/search-filter/search-filter/search-filter.component';
import { SearchResultsComponent } from '../../../features/search-result/search-results/search-results.component';

@Component({
  selector: 'app-search-customer',
  standalone: true,
  imports: [
    CommonModule,
    SearchFilterComponent,
    SearchResultsComponent
  ],
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCustomerComponent { }
