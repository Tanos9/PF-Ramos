import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFixFontSize]'
})
export class TitlesSizeDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
  }
}