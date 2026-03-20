import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-newtask',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './newtask.html',
  styleUrl: './newtask.scss',
})
export class Newtask implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly todoService = inject(TaskService);
  isEditMode = signal(false);
  taskId: string | null = null;

  readonly statusOptions = ['TO_DO', 'IN_PROGRESS', 'DONE'];
  readonly submitAttempted = signal(false);

  readonly taskForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    status: ['TO_DO', Validators.required],
  });

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    if (this.isEditMode()) {
      console.log('update task', this.taskId, this.taskForm.getRawValue());
    } else {
      console.log('create task', this.taskForm.getRawValue());
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
    //if path is edittask then we are in edit mode
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
        status: task.completed ? 'DONE' : 'TO_DO',
      });
    });
  }
}
