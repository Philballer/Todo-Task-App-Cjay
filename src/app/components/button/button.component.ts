import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input()
  buttonName: string = 'Default Button';

  @Input()
  buttonClass: string = '';

  @Output()
  onButtonCLick = new EventEmitter<void>();

  handleButtonClick(): void {
    this.onButtonCLick.emit();
  }
}
