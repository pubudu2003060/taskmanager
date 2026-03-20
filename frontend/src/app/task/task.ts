import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoItem } from '../models/todo.model';
import { TodoCard } from '../components/todo-card/todo-card';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FolterTodosPipe } from '../pipes/folter-todos-pipe';
import { RouterLink } from '@angular/router';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task',
  imports: [TodoCard, FormsModule, FolterTodosPipe, RouterLink],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task implements OnInit {
  taskService = inject(TaskService);
  tasks = signal<TodoItem[]>([]);
  searchTerm = signal('');
  isTaskLoaded = signal(false);

  ngOnInit(): void {
    this.taskService
      .getTodosFromAPI()
      .pipe(
        catchError((error) => {
          console.error('Error fetching todos:', error);
          this.isTaskLoaded.set(false);
          throw error;
        }),
      )
      .subscribe((todos) => {
        console.log('Fetched todos:', todos);
        this.tasks.set(todos);
        this.isTaskLoaded.set(true);
      });
  }

  updateTodoItem(taskItem: TodoItem) {
    console.log('Todo item toggled:', taskItem);
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.id === taskItem.id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }
}
