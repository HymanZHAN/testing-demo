import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { inject } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  element = inject(ElementRef, { optional: true });

  ngAfterViewInit(): void {
    this.element?.nativeElement?.focus();
  }
}
