import { Component } from '@angular/core';
import { Task, TaskService } from '../../services/task/task.service';
import { SingleTaskComponent } from '../single-task/single-task.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-display',
  imports: [SingleTaskComponent, CdkDrag, CdkDropList],
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

  drop(event: CdkDragDrop<Task[]>) {
    const reordered = [...this.taskService.Tasks()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.taskService.reorderTasks(reordered);
  }
}
