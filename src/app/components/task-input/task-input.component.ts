import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TaskService } from '../../services/task/task.service';
import { EasySubscribeComponent } from '../easy-subscribe/easy-subscribe.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-input',
  imports: [ButtonComponent],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss',
})
export class TaskInputComponent
  extends EasySubscribeComponent
  implements OnInit
{
  @ViewChild('taskInput')
  private taskInputElement: ElementRef<HTMLInputElement> | null = null;
  public editMode = signal<boolean>(false);
  public currentEditedTaskId = signal<number | null>(null);

  constructor(private taskService: TaskService) {
    super();
  }

  ngOnInit(): void {
    this.taskService.taskToEdit$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        if (value && this.taskInputElement) {
          this.taskInputElement.nativeElement.value = value.value;
          this.currentEditedTaskId.set(value.id);
          this.editMode.set(true);
        }
      });
  }

  handleAddTaskButtonClicked(element: HTMLInputElement): void {
    const id = this.currentEditedTaskId();

    this.editMode()
      ? this.taskService.replaceEditedTask(id ?? 0, element.value)
      : this.taskService.addTask(element.value);
    this.editMode.set(false);
    element.value = '';
  }

  controlInputState(value: string): void {
    if (value === '') {
      this.editMode.set(false);
    }
  }
}
