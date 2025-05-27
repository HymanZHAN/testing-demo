import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CounterComponent } from './counter.component';
import { SignalCounterComponent as CounterComponent } from './signal-counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  describe('default behaviors', () => {
    it('should render the "Hi" greeting', () => {
      // Arrange
      const expGreeting = 'Hi';
      const rendered = compiled.querySelector('.greeting');
      // Act
      // Assert
      expect(rendered?.textContent).toContain(expGreeting);
    });

    it("should render the '0' counter value", () => {
      // Arrange
      const expCounterText = 'Current Count: 0';
      const rendered = compiled.querySelector('.counter-row');
      // Act
      // Assert
      expect(rendered?.textContent).toContain(expCounterText);
    });
  });

  describe('interaction', () => {
    it('should increase count when the increment button is clicked', () => {
      // Arrange
      const expCount = 1;
      const rendered = compiled.querySelector('.counter-text');
      const incrementBtn = compiled.querySelector('#increment-btn');

      // Act
      incrementBtn?.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      // Assert
      expect(rendered?.textContent).toContain(expCount);
    });

    it('should decrease count when the decrement button is clicked', () => {
      // Arrange
      const expCount = -1;
      const rendered = compiled.querySelector('.counter-text');
      const incrementBtn = compiled.querySelector('#decrement-btn');

      // Act
      incrementBtn?.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      // Assert
      expect(rendered?.textContent).toContain(expCount);
    });

    it('should allow manual edit of the counter', () => {
      // Arrange
      const counterSpan = compiled.querySelector('span.counter-text');
      const expCount = 200;

      // Act
      // Enter edit mode
      counterSpan?.dispatchEvent(new Event('dblclick'));
      fixture.detectChanges();

      // Edit counter value
      const counterInput = compiled.querySelector('input') as HTMLInputElement;
      counterInput.valueAsNumber = expCount;
      counterInput.dispatchEvent(new Event('input'));
      counterInput.blur();
      fixture.detectChanges();

      // Assert
      const rendered = compiled.querySelector('.counter-text');
      expect(rendered?.textContent).toContain(expCount);
    });
  });

  describe('I/O', () => {
    @Component({
      selector: 'app-test',
      imports: [CounterComponent],
      template: `<app-counter [(count)]="count" [greeting]="greeting" />`,
    })
    class TestHost {
      count = 0;
      greeting = 'Hi';
    }

    let hostFixture: ComponentFixture<TestHost>;
    let compiledHost: HTMLElement;
    let hostComponent: TestHost;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHost);
      hostFixture.detectChanges();
      compiledHost = hostFixture.nativeElement;
      hostComponent = hostFixture.componentInstance;
    });

    it('should react to input change', () => {
      // Arrange
      const expCount = 200;
      const expGreeting = 'New Greetings';
      const expCountText = `Current Count: ${expCount}`;

      // Act
      hostComponent.count = expCount;
      hostComponent.greeting = expGreeting;
      hostFixture.detectChanges();

      // Assert
      const actGreeting = compiledHost.querySelector('.greeting')?.textContent;
      expect(actGreeting).toBe(expGreeting);

      const actCountText = compiledHost.querySelector('.counter-text')?.textContent;
      expect(actCountText).toContain(expCountText);
    });

    it('should output count update when decremented', () => {
      // Arrange
      const initialCount = hostComponent.count;

      // Act
      const incrementBtn = compiledHost.querySelector('#decrement-btn');
      incrementBtn?.dispatchEvent(new Event('click'));
      hostFixture.detectChanges();

      // Assert
      expect(hostComponent.count).toBe(initialCount - 1);
    });

    it('should output count update when incremented', () => {
      // Arrange
      const initialCount = hostComponent.count;

      // Act
      const incrementBtn = compiledHost.querySelector('#increment-btn');
      incrementBtn?.dispatchEvent(new Event('click'));
      hostFixture.detectChanges();

      // Assert
      expect(hostComponent.count).toBe(initialCount + 1);
    });

    it('should output count update when manually edited', () => {
      // Arrange
      const counterSpan = compiledHost.querySelector('span.counter-text');
      const expCount = 200;

      // Act
      // Enter edit mode
      counterSpan?.dispatchEvent(new Event('dblclick'));
      hostFixture.detectChanges();

      // Edit counter value
      const counterInput = compiledHost.querySelector('input') as HTMLInputElement;
      counterInput.valueAsNumber = expCount;
      counterInput.dispatchEvent(new Event('input'));
      counterInput.blur();
      fixture.detectChanges();

      // Assert
      expect(hostComponent.count).toBe(expCount);
    });
  });
});
