import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomerId]',
  standalone:true
})
export class CustomerIdDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const regex = /^[a-zA-Z0-9\- ]*$/; // Latin karakterler, - işareti ve rakamlar
    const value = input.value;
    if (!regex.test(value)) {
      input.value = value.replace(/[^a-zA-Z0-9\- ]/g, '');
    }
  }
}