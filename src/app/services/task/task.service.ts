import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id?: number;
  taskname: string;
  orderIndex?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:8080/api/tasks';

  private taskToEdit = new BehaviorSubject<{
    value: string;
    index: number;
    id: number;
  } | null>(null);
  public taskToEdit$ = this.taskToEdit.asObservable();

  public Tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  public loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.Tasks.set(tasks);
    });
  }

  public addTask(text: string): void {
    if (!text?.trim()) {
      alert('Text is empty');
      return;
    }
    this.http.post<Task>(this.apiUrl, { taskname: text }).subscribe((task) => {
      this.Tasks.update((tasks) => [...tasks, task]);
    });
  }

  public editTask(index: number): void {
    const task = this.Tasks()[index];
    if (task.id !== undefined) {
      this.taskToEdit.next({ value: task.taskname, index, id: task.id });
    }
  }

  public deleteTask(index: number): void {
    const task = this.Tasks()[index];
    if (task.id === undefined) return;
    this.http.delete(`${this.apiUrl}/${task.id}`).subscribe(() => {
      this.Tasks.update((tasks) => tasks.filter((_, i) => i !== index));
    });
  }

  public replaceEditedTask(id: number, updatedValue: string): void {
    this.http
      .put<Task>(`${this.apiUrl}/${id}`, { taskname: updatedValue })
      .subscribe((updated) => {
        this.Tasks.update((tasks) =>
          tasks.map((task) => (task.id === id ? updated : task))
        );
      });
  }

  public reorderTasks(reordered: Task[]): void {
    this.Tasks.set(reordered);
    this.http.put<Task[]>(`${this.apiUrl}/reorder`, reordered).subscribe();
  }
}
