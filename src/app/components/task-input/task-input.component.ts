import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task-input',
  imports: [ButtonComponent],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss',
})
export class TaskInputComponent {
  constructor(private taskService: TaskService) {}

  handleAddTaskButtonClicked(element: HTMLInputElement): void {
    this.taskService.addTask(element.value);
    element.value = '';
  }
}
