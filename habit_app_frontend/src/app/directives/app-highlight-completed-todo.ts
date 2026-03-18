import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appAppHighlightCompletedTodo]',
})
export class AppHighlightCompletedTodo {
  isCompleted = input(false);
  el = inject(ElementRef);
  styleEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.backgroundColor = 'lightgreen';
    } else {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  });
}
