import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  imports: [FormsModule],
  template: `
    <div class="flex flex-col space-y-2 p-3 rounded-md border-2 border-primary">
      <span class="italic font-serif">{{ hello }}</span>
      <div class="flex items-center-safe space-x-4">
        <button (click)="decrement()" class="btn btn-primary">-</button>
        @if (!isEditMode) {
          <span (dblclick)="toggleEditMode()">
            Current Count:
            <span class="font-bold text-lg text-warning">{{ _count }}</span>
          </span>
        } @else {
          <input
            type="number"
            [(ngModel)]="_count"
            (blur)="toggleEditMode()"
            class="input w-32"
          />
        }
        <button (click)="increment()" class="btn btn-primary">+</button>
      </div>
      <button (click)="reset()" class="mt-2 self-end btn btn-circle btn-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  `,
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
  }
}
