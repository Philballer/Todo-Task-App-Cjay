import { Injectable, signal } from '@angular/core';

export interface Task {
  taskname: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public Tasks = signal<Task[]>([
    { taskname: 'Do Homework' },
    { taskname: 'Wash Clothes' },
    { taskname: 'Read a Novel' },
    { taskname: 'Play vidieo game' },
  ]);

  public addTask(text: string): void {
    if (text === '' || text === null || text === undefined) {
      alert('Text is empty');
      return;
    }
    this.Tasks().unshift({ taskname: text });
  }

  public editTask(index: number): void {
    console.log('edit', index);
  }

  public deleteTask(index: number): void {
    this.Tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }
}
