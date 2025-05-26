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
    it('should increase the count value when the increment button is clicked', () => {
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

    it('should decrease the count value when decremented', () => {
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

    it('should allow manual edit of the counter value', () => {
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
      counterInput.dispatchEvent(new Event('blur'));
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
    class TestComponent {
      count = 5;
      greeting = 'Hello, World!';
    }

    let testFixture: ComponentFixture<TestComponent>;
    let testCompiled: HTMLElement;
    let testComponent: TestComponent;

    beforeEach(() => {
      testFixture = TestBed.createComponent(TestComponent);
      testFixture.detectChanges();
      testCompiled = testFixture.nativeElement;
      testComponent = testFixture.componentInstance;
    });

    it('should accept input values', () => {
      // Arrange
      // Act
      const { greeting: expGreeting, count: expCount } = testComponent;
      const expCountText = `Current Count: ${expCount}`;

      // Assert
      const actGreeting = testCompiled.querySelector('.greeting')?.textContent;
      expect(actGreeting).toBe(expGreeting);

      const actCountText = testCompiled.querySelector('.counter-text')?.textContent;
      expect(actCountText).toContain(expCountText);
    });

    it('should output counter value update when decremented', () => {
      // Arrange
      const initialCount = testComponent.count;

      // Act
      const incrementBtn = testCompiled.querySelector('#decrement-btn');
      incrementBtn?.dispatchEvent(new Event('click'));
      testFixture.detectChanges();

      // Assert
      expect(testComponent.count).toBe(initialCount - 1);
    });

    it('should output counter value update when incremented', () => {
      // Arrange
      const initialCount = testComponent.count;

      // Act
      const incrementBtn = testCompiled.querySelector('#increment-btn');
      incrementBtn?.dispatchEvent(new Event('click'));
      testFixture.detectChanges();

      // Assert
      expect(testComponent.count).toBe(initialCount + 1);
    });

    it('should output counter value update when manually edited', () => {
      // Arrange
      const counterSpan = testCompiled.querySelector('span.counter-text');
      const expCount = 200;

      // Act
      // Enter edit mode
      counterSpan?.dispatchEvent(new Event('dblclick'));
      testFixture.detectChanges();

      // Edit counter value
      const counterInput = testCompiled.querySelector('input');
      if (counterInput) {
        counterInput.valueAsNumber = expCount;
        counterInput.dispatchEvent(new Event('input'));
        counterInput.dispatchEvent(new Event('blur'));
        testFixture.detectChanges();
      }

      // Assert
      expect(testComponent.count).toBe(expCount);
    });
  });
});
