import { Injectable, inject } from '@angular/core';
import { TodoItem } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Todoservice {
  http = inject(HttpClient);
  getTodosFromAPI() {
    return this.http.get<TodoItem[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
