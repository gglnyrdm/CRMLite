import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-customer-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './create-customer-form.component.html',
  styleUrl: './create-customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerFormComponent {
  
}
