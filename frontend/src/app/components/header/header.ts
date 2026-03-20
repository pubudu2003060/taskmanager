import { Component, inject } from '@angular/core';
import { signal } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  appName = signal('Task Manager');

  loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
