import { Component, input, output } from '@angular/core';
import { TodoItem } from '../../models/todo.model';
import { AppHighlightCompletedTodo } from '../../directives/app-highlight-completed-todo';
import { todo } from 'node:test';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DescriptionSlicePipePipe } from '../../pipes/description-slice-pipe-pipe';

@Component({
  selector: 'app-todo-card',
  imports: [AppHighlightCompletedTodo, UpperCasePipe, RouterLink, DescriptionSlicePipePipe],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.scss',
})
export class TodoCard {
  todoItem = input.required<TodoItem>();
  todoTogled = output<TodoItem>();

  todoClicked() {
    this.todoTogled.emit(this.todoItem());
  }
}
