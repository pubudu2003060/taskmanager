import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  JWTResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponce,
  User,
} from '../models/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  router = inject(Router);
  isLoggedIn = signal(!!localStorage.getItem('jwt'));

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
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLogin');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  setLoggedIn(token: string) {
    localStorage.setItem('jwt', token);
    localStorage.setItem('isLogin', 'true');
    this.isLoggedIn.set(true);
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
