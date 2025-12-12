import { Component } from '@angular/core';
import { Task, TaskService } from '../../services/task/task.service';
import { SingleTaskComponent } from '../single-task/single-task.component';

@Component({
  selector: 'app-tasks-display',
  imports: [SingleTaskComponent],
  templateUrl: './tasks-display.component.html',
  styleUrl: './tasks-display.component.scss',
})
export class TasksDisplayComponent {
  constructor(public taskService: TaskService) {}

  handleSideButtonsClicked(command: string, index: number): void {
    if (command === 'edit') {
      this.taskService.editTask(index);
    }

    if (command === 'delete') {
      this.taskService.deleteTask(index);
    }
  }
}
