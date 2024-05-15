import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { SearchCustomerResponse } from '../../../models/responses/search/search-customer-response';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent { 
  @Input() customerList: SearchCustomerResponse[] = [];
  showCustomerList: boolean = false;

  constructor(
    private change: ChangeDetectorRef,
  ) {}

  ngOnInit():void {
    this.showCustomerList =false;
  }

  ngOnChanges():void{
    this.change.markForCheck();
    if(this.customerList.length==0)
      {
        this.showCustomerList = true;
      }
  }
}
