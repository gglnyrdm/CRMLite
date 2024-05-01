import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyLetterDirective]',
  standalone: true,
})
export class OnlyLetterDirective { 
  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    input.value = inputValue.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g, ''); 
  }
}
