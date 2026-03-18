import { Component, inject, OnInit, signal } from '@angular/core';
import { Todoservice } from '../services/todoservice';
import { TodoItem } from '../models/todo.model';
import { TodoCard } from '../components/todo-card/todo-card';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FolterTodosPipe } from '../pipes/folter-todos-pipe';

@Component({
  selector: 'app-todo',
  imports: [TodoCard, FormsModule, FolterTodosPipe],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo implements OnInit {
  todoService = inject(Todoservice);
  todos = signal<TodoItem[]>([]);
  searchTerm = signal('');

  isTodoLoaded = signal(false);

  ngOnInit(): void {
    this.todoService
      .getTodosFromAPI()
      .pipe(
        catchError((error) => {
          console.error('Error fetching todos:', error);
          this.isTodoLoaded.set(false);
          throw error;
        }),
      )
      .subscribe((todos) => {
        this.todos.set(todos);
        this.isTodoLoaded.set(true);
      });
  }

  updateTodoItem(todoItem: TodoItem) {
    console.log('Todo item toggled:', todoItem);
    this.todos.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  }
}
