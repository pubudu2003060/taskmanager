import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JWTResponse, LoginRequest, RegisterRequest, User } from '../models/user.mode';
import { LoginService } from '../services/login-service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  pageType = signal('login');

  loginService = inject(LoginService);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.pageType() === 'login') {
      const user: LoginRequest = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || '',
      };
      this.loginService
        .login(user)
        .pipe(
          catchError((error) => {
            console.error('Error fetching todos:', error);
            throw error;
          }),
        )
        .subscribe((jwt) => {
          localStorage.setItem('jwt', jwt.token);
        });
    } else if (this.pageType() === 'register') {
      const user: RegisterRequest = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || '',
      };
      this.loginService
        .register(user)
        .pipe(
          catchError((error) => {
            console.error('Error fetching todos:', error);
            throw error;
          }),
        )
        .subscribe((response) => {
          console.log('Registration Response:', response);
          alert('Registration successful! Please login.');
          this.changePageType('login');
        });
    }
    console.log(this.loginForm.value);
  }

  changePageType(type: string) {
    this.pageType.set(type);
  }
}
