import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumberInput]',
  standalone:true
})
export class OnlyNumberInputDirective {

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    input.value = inputValue.replace(/\D/g, ''); 
  }
}