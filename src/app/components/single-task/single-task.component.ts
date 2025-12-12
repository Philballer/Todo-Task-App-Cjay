import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-single-task',
  imports: [ButtonComponent],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.scss',
})
export class SingleTaskComponent {
  @Input()
  taskName: string = 'Default task name';

  @Output()
  editOrDeleteButtonsClicked = new EventEmitter<string>();

  handleButtonClicked(command: number): void {
    if (command === 1) {
      this.editOrDeleteButtonsClicked.emit('edit');
    }
    if (command === 0) {
      this.editOrDeleteButtonsClicked.emit('delete');
    }
  }
}
