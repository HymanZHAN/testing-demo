import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { SignalCounterComponent } from './counter/signal-counter.component';

@Component({
  selector: 'app-root',
  imports: [SignalCounterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'testing-demo';
  appCount = 100;
}
