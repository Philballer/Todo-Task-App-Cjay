import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  private taskService = inject(TaskService);

  today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  total = computed(() => this.taskService.Tasks().length);
  remaining = computed(() => this.taskService.Tasks().filter((t) => !t.completed).length);
  done = computed(() => this.taskService.Tasks().filter((t) => t.completed).length);
}
