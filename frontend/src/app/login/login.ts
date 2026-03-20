import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JWTResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';
import { LoginService } from '../services/login-service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  router = inject(Router);

  pageType = signal('login');
  errorMessage = signal('');
  submitAttempted = signal(false);

  loginService = inject(LoginService);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.submitAttempted.set(true);
    this.errorMessage.set('');

    if (this.loginForm.invalid) {
      return;
    }

    if (this.pageType() === 'login') {
      const user: LoginRequest = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || '',
      };
      this.loginService
        .login(user)
        .pipe(
          catchError((error) => {
            console.error('Login error:', error);
            this.errorMessage.set('Login failed. Please check your credentials.');
            throw error;
          }),
        )
        .subscribe((jwt) => {
          this.loginService.setLoggedIn(jwt.token);
          this.router.navigate(['/']);
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
            console.error('Registration error:', error);
            this.errorMessage.set('Registration failed. Please try again.');
            throw error;
          }),
        )
        .subscribe((response) => {
          console.log('Registration Response:', response);
          alert('Registration successful! Please login.');
          this.changePageType('login');
        });
    }
  }

  changePageType(type: string) {
    this.pageType.set(type);
    this.submitAttempted.set(false);
    this.errorMessage.set('');
    this.loginForm.reset();
  }
}
