import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-popup',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dialog-popup.component.html',
  styleUrl: './dialog-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPopupComponent { 

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}
