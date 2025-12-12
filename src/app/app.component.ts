import { Component } from '@angular/core';
import { TitleComponent } from './components/title/title.component';
import { TaskInputComponent } from './components/task-input/task-input.component';
import { TasksDisplayComponent } from './components/tasks-display/tasks-display.component';

@Component({
  selector: 'app-root',
  imports: [TitleComponent, TaskInputComponent, TasksDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TO DO List';
}
