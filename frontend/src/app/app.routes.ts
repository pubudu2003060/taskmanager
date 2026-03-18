import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    pathMatch: 'full',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'todo',
    title: 'Todo',
    pathMatch: 'full',
    loadComponent: () => import('./todo/todo').then((m) => m.Todo),
  },
];
