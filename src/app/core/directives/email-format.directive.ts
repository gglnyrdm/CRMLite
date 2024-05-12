import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmailFormat]',
  standalone: true,
})
export class EmailFormatDirective {

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = event.target.value;
    event.target.value = initialValue.replace(/[^a-zA-Z0-9_.@-]/g, ''); // Sadece istenilen karakterler kalacak
    if (event.target.value.includes('@')) {
      const atIndex = event.target.value.indexOf('@');
      const afterAt = event.target.value.substr(atIndex + 1);
      if (afterAt.includes('@')) {
        // Birden fazla @ sembolü var, sonraki @ sembollerini kaldır
        event.target.value = event.target.value.substr(0, atIndex + 1);
      }
    }
    if (initialValue !== event.target.value) {
      // Değişiklik yapıldıysa, input eventini tetikle
      event.target.dispatchEvent(new Event('input'));
    }
  }
 }
