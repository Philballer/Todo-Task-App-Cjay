import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-task',
  imports: [],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.scss',
})
export class SingleTaskComponent {
  @Input() taskName: string = '';
  @Input() completed: boolean = false;

  @Output() taskAction = new EventEmitter<string>();
}
