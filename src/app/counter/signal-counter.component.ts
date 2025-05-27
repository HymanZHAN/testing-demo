import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StopIconComponent } from './stop-icon.component';
import { AutoFocusDirective } from '../shared/auto-focus.directive';

@Component({
  selector: 'app-counter',
  imports: [FormsModule, StopIconComponent, AutoFocusDirective],
  template: `
    <div class="counter-container">
      <span class="greeting">{{ hello() }}</span>
      <div class="counter-row">
        <button id="decrement-btn" (click)="decrement()" class="btn btn-primary">
          -
        </button>
        @if (!isEditMode()) {
          <span (dblclick)="isEditMode.set(true)" class="counter-text"
            >Current Count: <span class="counter-value">{{ count() }}</span>
          </span>
        } @else {
          <input
            type="number"
            [(ngModel)]="count"
            (blur)="isEditMode.set(false)"
            (keyup.enter)="isEditMode.set(false)"
            class="input w-32"
            #i
            appAutoFocus
          />
        }
        <button id="increment-btn" (click)="increment()" class="btn btn-primary">
          +
        </button>
      </div>
      <button (click)="reset()" class="reset-btn">
        <app-icon-stop />
      </button>
    </div>
  `,
  styleUrl: './counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalCounterComponent {
  count = model(0);
  hello = input('Hi', { alias: 'greeting' });

  isEditMode = signal(false);

  increment() {
    this.count.update((c) => ++c);
  }

  decrement() {
    this.count.update((c) => --c);
  }

  reset() {
    this.count.set(0);
  }
}
