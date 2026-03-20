import { inject, Injectable } from '@angular/core';
import { CreateTodoItem, TodoItem } from '../models/todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  private getAuthHeaders() {
    const token = localStorage.getItem('jwt') || '';

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getTodosFromAPI() {
    return this.http.get<TodoItem[]>(`${environment.apiUrl}/api/v1/tasks`, this.getAuthHeaders());
  }

  getTodoById(id: string) {
    console.log('Fetching task details for ID:', id);
    return this.http.get<TodoItem>(
      `${environment.apiUrl}/api/v1/tasks/${id}`,
      this.getAuthHeaders(),
    );
  }

  createTask(task: CreateTodoItem) {
    return this.http.post<CreateTodoItem>(
      `${environment.apiUrl}/api/v1/tasks`,
      {
        title: task.title,
        description: task.description,
        status: task.status,
      },
      this.getAuthHeaders(),
    );
  }

  updateTask(id: string, task: CreateTodoItem) {
    return this.http.put<CreateTodoItem>(
      `${environment.apiUrl}/api/v1/tasks/${id}`,
      {
        title: task.title,
        description: task.description,
        status: task.status,
      },
      this.getAuthHeaders(),
    );
  }

  deleteTask(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/api/v1/tasks/${id}`, this.getAuthHeaders());
  }
}
