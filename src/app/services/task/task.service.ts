import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  taskname: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskToEdit = new BehaviorSubject<{
    value: string;
    index: number;
  } | null>(null);
  public taskToEdit$ = this.taskToEdit.asObservable();

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
    this.taskToEdit.next({ value: this.Tasks()[index].taskname, index });
  }

  public deleteTask(index: number): void {
    this.Tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  public replaceEditedTask(idx: number, updatedValue: string): void {
    this.Tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === idx ? { ...task, taskname: updatedValue } : task
      )
    );
  }
}
