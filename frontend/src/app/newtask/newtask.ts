import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { TaskService } from '../services/task-service';
import { CreateTodoItem, TodoItem } from '../models/todo.model';

@Component({
  selector: 'app-newtask',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './newtask.html',
  styleUrl: './newtask.scss',
})
export class Newtask implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly todoService = inject(TaskService);
  isEditMode = signal(false);
  taskId: string | null = null;

  readonly statusOptions = ['TO_DO', 'IN_PROGRESS', 'DONE'];
  readonly submitAttempted = signal(false);

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    status: new FormControl<'TO_DO' | 'IN_PROGRESS' | 'DONE'>('TO_DO', Validators.required),
  });

  onSubmit(): void {
    this.submitAttempted.set(true);

    if (this.taskForm.invalid) return;

    if (this.isEditMode()) {
      console.log('update task', this.taskId, this.taskForm.getRawValue());
    } else {
      const task: CreateTodoItem = {
        title: this.taskForm.value.title || '',
        description: this.taskForm.value.description || '',
        status: this.taskForm.value.status || 'TO_DO',
      };

      this.todoService
        .createTask(task)
        .pipe(
          catchError((error) => {
            console.error('Error creating task:', error);
            throw error;
          }),
        )
        .subscribe((task) => {
          console.log('Created task:', task);
          this.submitAttempted.set(false);
          this.router.navigate(['/']);
        });
    }
  }

  onCancel(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      status: 'TO_DO',
    });
    this.submitAttempted.set(false);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.taskId = id;
    }

    if (!id) {
      return;
    }

    this.todoService.getTodoById(id).subscribe((task) => {
      this.taskForm.patchValue({
        title: task.title,
        description: task.title,
        status: task.status,
      });
    });
  }
}
