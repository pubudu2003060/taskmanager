import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoItem } from '../models/todo.model';
import { TodoCard } from '../components/todo-card/todo-card';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';
import { RouterLink } from '@angular/router';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-task',
  imports: [TodoCard, FormsModule, FilterTodosPipe, RouterLink],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task implements OnInit {
  taskService = inject(TaskService);
  tasks = signal<TodoItem[]>([]);
  searchTerm = '';
  selectedStatusFilter: 'ALL' | 'TO_DO' | 'IN_PROGRESS' | 'DONE' = 'ALL';
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

  setStatusFilter(filter: 'ALL' | 'TO_DO' | 'IN_PROGRESS' | 'DONE') {
    this.selectedStatusFilter = filter;
  }

  onTaskDeleted(id: string) {
    if (window.confirm('Do you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks.update((tasks) => tasks.filter((t) => t.id.toString() !== id));
        },
        error: (err) => console.error('Failed to delete task', err),
      });
    }
  }
}
