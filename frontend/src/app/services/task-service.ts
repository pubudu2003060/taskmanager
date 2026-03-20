import { inject, Injectable } from '@angular/core';
import { TodoItem } from '../models/todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UUID } from 'crypto';

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
}
