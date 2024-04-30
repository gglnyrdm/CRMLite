import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-single-focus-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-focus-layout.component.html',
  styleUrl: './single-focus-layout.component.scss'
  
})
export class SingleFocusLayoutComponent {
  @Input() headerTemplate?: TemplateRef<any>;
}
