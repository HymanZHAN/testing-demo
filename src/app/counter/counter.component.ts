import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StopIconComponent } from './stop-icon.component';
import { AutoFocusDirective } from '../shared/auto-focus.directive';

@Component({
  selector: 'app-counter',
  imports: [FormsModule, StopIconComponent, AutoFocusDirective],
  template: `
    <div class="counter-container">
      <span class="greeting">{{ hello }}</span>
      <div class="counter-row">
        <button (click)="decrement()" class="btn btn-primary">-</button>
        @if (!isEditMode) {
          <span (dblclick)="toggleEditMode()" class="counter-text"
            >Current Count: <span class="counter-value">{{ _count }}</span>
          </span>
        } @else {
          <input
            type="number"
            [(ngModel)]="_count"
            (blur)="toggleEditMode()"
            (keyup.enter)="toggleEditMode()"
            class="input w-32"
            appAutoFocus
          />
        }
        <button (click)="increment()" class="btn btn-primary">+</button>
      </div>
      <button (click)="reset()" class="reset-btn">
        <app-icon-stop />
      </button>
    </div>
  `,
  styleUrl: './counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  _count = 0;
  @Input() set count(value: number) {
    this._count = value;
  }
  @Output() countChange = new EventEmitter<number>();

  @Input({ alias: 'greeting' }) hello = 'Hi';

  isEditMode = false;

  increment() {
    this._count = this._count + 1;
    this.countChange.emit(this._count);
  }

  decrement() {
    this._count = this._count - 1;
    this.countChange.emit(this._count);
  }

  reset() {
    this.count = 0;
    this.countChange.emit(this._count);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.countChange.emit(this._count);
    }
  }
}
