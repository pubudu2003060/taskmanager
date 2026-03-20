import { Component, inject, OnInit, output, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoItem } from '../models/todo.model';
import { TaskService } from '../services/task-service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-taskdetails',
  imports: [RouterLink],
  templateUrl: './taskdetails.html',
  styleUrl: './taskdetails.scss',
})
export class Taskdetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly todoService = inject(TaskService);
  outTask = output<TodoItem>();

  task = signal<TodoItem>({} as TodoItem);
  isLoading = signal(true);
  errorMessage = '';
  taskId: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Task ID is missing.';
      this.isLoading.set(false);
      return;
    }

    this.taskId = id;

    this.todoService.getTodoById(id).subscribe({
      next: (todo) => {
        this.task.set(todo);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching task details:', error);
        this.errorMessage = 'Unable to load task details.';
        this.isLoading.set(false);
      },
    });
  }

  getStatusLabel(): string {
    return this.task().status;
  }

  onDelete(): void {
    if (!this.taskId) {
      return;
    }

    const shouldDelete = window.confirm('Do you want to delete this task?');
    if (!shouldDelete) {
      return;
    }

    this.todoService
      .deleteTask(this.taskId)
      .pipe(
        catchError((error) => {
          console.error('Error deleting task:', error);
          this.errorMessage = 'Unable to delete task.';
          throw error;
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
