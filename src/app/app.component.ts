import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'testing-demo';
  appCount = 100;
}
