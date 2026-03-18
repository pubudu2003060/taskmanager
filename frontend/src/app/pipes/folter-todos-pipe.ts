import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../models/todo.model';

@Pipe({
  name: 'folterTodos',
})
export class FolterTodosPipe implements PipeTransform {
  transform(value: TodoItem[], searchTerm: string): TodoItem[] {
    if (!searchTerm) {
      return value;
    }
    const text = searchTerm.toLocaleLowerCase();
    return value.filter((value) => {
      return value.title.toLocaleLowerCase().includes(text);
    });
  }
}
