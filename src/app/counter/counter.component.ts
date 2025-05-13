import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  imports: [FormsModule],
  template: `
    <div class="flex flex-col space-y-2 p-3 rounded-md border-2 border-primary">
      <span class="italic font-serif">{{ hello() }}</span>
      <div class="flex items-center-safe space-x-4">
        <button (click)="decrement()" class="btn btn-primary">-</button>
        @if (!isEditMode()) {
          <span (dblclick)="toggleEditMode()">
            Current Count:
            <span class="font-bold text-lg text-warning">{{ count() }}</span>
          </span>
        } @else {
          <input type="number" [(ngModel)]="count" (blur)="toggleEditMode()" />
        }
        <button (click)="increment()" class="btn btn-primary">+</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  count = model(0);
  hello = input('Hi', { alias: 'greeting' });
  isEditMode = signal(false);

  increment() {
    this.count.update((c) => ++c);
  }

  decrement() {
    this.count.update((c) => --c);
  }

  toggleEditMode() {
    this.isEditMode.update((m) => !m);
  }
}
