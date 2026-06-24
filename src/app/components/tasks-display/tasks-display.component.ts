import { Component, computed, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Task, TaskService } from '../../services/task/task.service';
import { SingleTaskComponent } from '../single-task/single-task.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

type Filter = 'all' | 'active' | 'done';

@Component({
  selector: 'app-tasks-display',
  imports: [SingleTaskComponent, CdkDrag, CdkDropList, CdkDragPlaceholder, TitleCasePipe],
  templateUrl: './tasks-display.component.html',
  styleUrl: './tasks-display.component.scss',
})
export class TasksDisplayComponent {
  readonly filters: Filter[] = ['all', 'active', 'done'];
  activeFilter = signal<Filter>('all');

  filteredTasks = computed(() => {
    const f = this.activeFilter();
    const tasks = this.taskService.Tasks();
    if (f === 'active') return tasks.filter((t) => !t.completed);
    if (f === 'done') return tasks.filter((t) => t.completed);
    return tasks;
  });

  counts = computed(() => {
    const tasks = this.taskService.Tasks();
    return {
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      done: tasks.filter((t) => t.completed).length,
    };
  });

  constructor(public taskService: TaskService) {}

  setFilter(f: Filter): void {
    this.activeFilter.set(f);
  }

  handleTaskAction(command: string, task: Task): void {
    if (!task.id) return;
    if (command === 'edit') this.taskService.editTask(task.id);
    if (command === 'delete') this.taskService.deleteTask(task.id);
    if (command === 'toggle') this.taskService.toggleComplete(task.id, !task.completed);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    const reordered = [...this.taskService.Tasks()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.taskService.reorderTasks(reordered);
  }
}
