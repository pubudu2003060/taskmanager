import { Component, inject, OnInit, output, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoItem } from '../models/todo.model';
import { TaskService } from '../services/task-service';
import { UUID } from 'crypto';

@Component({
  selector: 'app-taskdetails',
  imports: [RouterLink],
  templateUrl: './taskdetails.html',
  styleUrl: './taskdetails.scss',
})
export class Taskdetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly todoService = inject(TaskService);
  outTask = output<TodoItem>();

  task = signal<TodoItem | null>(null);
  isLoading = signal(true);
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Task ID is missing.';
      this.isLoading.set(false);
      return;
    }

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
    return this.task()?.status === 'DONE' ? 'Completed' : 'Pending';
  }
}
