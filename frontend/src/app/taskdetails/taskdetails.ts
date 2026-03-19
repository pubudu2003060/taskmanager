import { Component, inject, OnInit, output, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoItem } from '../models/todo.model';
import { Todoservice } from '../services/todoservice';

@Component({
  selector: 'app-taskdetails',
  imports: [RouterLink],
  templateUrl: './taskdetails.html',
  styleUrl: './taskdetails.scss',
})
export class Taskdetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly todoService = inject(Todoservice);
  outTask = output<TodoItem>();

  task = signal<TodoItem | null>(null);
  isLoading = signal(true);
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.isLoading.set(false);
      this.errorMessage = 'Invalid task id.';
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
    return this.task()?.completed ? 'Completed' : 'To do';
  }
}
