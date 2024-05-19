import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-popup-with-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-popup-with-buttons.component.html',
  styleUrl: './dialog-popup-with-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPopupWithButtonsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

 }
