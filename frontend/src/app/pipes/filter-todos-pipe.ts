import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../models/todo.model';

@Pipe({
  name: 'filterTodos',
})
export class FilterTodosPipe implements PipeTransform {
  transform(
    value: TodoItem[],
    searchTerm: string,
    statusFilter: 'ALL' | 'TO_DO' | 'IN_PROGRESS' | 'DONE' = 'ALL',
  ): TodoItem[] {
    return value.filter((item) => {
      const matchesSearch =
        !searchTerm || item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
      const matchesStatus = statusFilter === 'ALL' || this.getTaskStatus(item) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  private getTaskStatus(item: TodoItem): 'TO_DO' | 'IN_PROGRESS' | 'DONE' {
    if (item.status) {
      return item.status;
    }
    return 'TO_DO';
  }
}
