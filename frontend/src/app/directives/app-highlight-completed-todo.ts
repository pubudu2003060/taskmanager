import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appAppHighlightCompletedTodo]',
})
export class AppHighlightCompletedTodo {
  status = input('');
  el = inject(ElementRef);
  styleEffect = effect(() => {
    if (this.status() === 'DONE') {
      this.el.nativeElement.style.backgroundColor = 'lightgreen';
    } else if (this.status() === 'TO_DO') {
      this.el.nativeElement.style.backgroundColor = 'red';
    } else if (this.status() === 'IN_PROGRESS') {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    }
  });
}
