import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Task Page',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./task/task').then((m) => m.Task),
  },
  {
    path: 'login',
    title: 'Login Page',
    pathMatch: 'full',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'newtask',
    title: 'New Task Page',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./newtask/newtask').then((m) => m.Newtask),
  },
  {
    path: 'edittask/:id',
    title: 'Edit Task Page',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./newtask/newtask').then((m) => m.Newtask),
  },
  {
    path: 'taskdetails/:id',
    title: 'Task Details Page',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./taskdetails/taskdetails').then((m) => m.Taskdetails),
  },
];
