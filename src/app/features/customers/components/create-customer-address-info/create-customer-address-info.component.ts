import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-customer-address',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './create-customer-address-info.component.html',
  styleUrl: './create-customer-address-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerAddressInfoComponent {

  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    console.log("toggle")
  }

  @HostListener('document:click', ['$event'])
  hideMenu(event: MouseEvent) {
    if (!event.target) return;


    const clickedInsideMenu = (event.target as HTMLElement).closest('.address-box-update-menu');
    if (!clickedInsideMenu) {
    console.log("hide")

      this.menuVisible = false;
    }
  }
 }
