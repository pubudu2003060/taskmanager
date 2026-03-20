import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  JWTResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponce,
  User,
} from '../models/user.mode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);

  login(user: LoginRequest) {
    if (!user.username) {
      throw new Error('Username is required');
    }
    if (!user.password) {
      throw new Error('Password is required');
    }
    return this.http.post<JWTResponse>(`${environment.apiUrl}/api/v1/users/login`, {
      username: user.username,
      password: user.password,
    });
  }

  logout() {
    return this.http.post('/api/logout', {});
  }

  register(user: RegisterRequest) {
    if (!user.username) {
      throw new Error('Username is required');
    }
    if (!user.password) {
      throw new Error('Password is required');
    }
    return this.http.post<RegisterResponce>(`${environment.apiUrl}/api/v1/users/register`, {
      username: user.username,
      password: user.password,
    });
  }
}
