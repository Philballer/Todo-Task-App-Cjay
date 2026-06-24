import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id?: number;
  taskname: string;
  orderIndex?: number;
  completed?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:8080/api/tasks';

  private taskToEdit = new BehaviorSubject<{ value: string; id: number } | null>(null);
  public taskToEdit$ = this.taskToEdit.asObservable();

  public Tasks = signal<Task[]>([]);
  public isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  public loadTasks(): void {
    this.isLoading.set(true);
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => {
        this.Tasks.set(tasks);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  public addTask(text: string): void {
    this.http.post<Task>(this.apiUrl, { taskname: text, completed: false }).subscribe((task) => {
      this.Tasks.update((tasks) => [...tasks, task]);
    });
  }

  public editTask(id: number): void {
    const task = this.Tasks().find((t) => t.id === id);
    if (task?.id !== undefined) {
      this.taskToEdit.next({ value: task.taskname, id: task.id });
    }
  }

  public deleteTask(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.Tasks.update((tasks) => tasks.filter((t) => t.id !== id));
    });
  }

  public replaceEditedTask(id: number, updatedValue: string): void {
    const task = this.Tasks().find((t) => t.id === id);
    this.http
      .put<Task>(`${this.apiUrl}/${id}`, { ...task, taskname: updatedValue })
      .subscribe((updated) => {
        this.Tasks.update((tasks) =>
          tasks.map((t) => (t.id === id ? { ...t, ...updated } : t))
        );
      });
  }

  public toggleComplete(id: number, completed: boolean): void {
    const task = this.Tasks().find((t) => t.id === id);
    if (!task) return;
    this.Tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed } : t))
    );
    this.http.put<Task>(`${this.apiUrl}/${id}`, { ...task, completed }).subscribe();
  }

  public reorderTasks(reordered: Task[]): void {
    this.Tasks.set(reordered);
    this.http.put<Task[]>(`${this.apiUrl}/reorder`, reordered).subscribe();
  }
}
