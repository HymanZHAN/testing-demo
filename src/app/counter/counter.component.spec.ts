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
    it('should have 0 as the counter value', () => {
      // Arrange
      const expCount = 0;
      // Act
      // Assert
      // @ts-ignore
      expect(component._count).toEqual(expCount);
    });

    it('should have "Hi" as the greeting', () => {
      // Arrange
      const expGreeting = 'Hi';
      // Act
      // Assert
      expect(component.hello).toEqual(expGreeting);
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
    it('should increase the count value when incremented', () => {
      // Arrange
      const expCount = 1;

      // Act
      component.increment();

      // Assert
      // @ts-ignore
      expect(component._count).toBe(expCount);
    });

    it('should decrease the count value when decremented', () => {
      // Arrange
      const expCount = -1;

      // Act
      component.decrement();

      // Assert
      // @ts-ignore
      expect(component._count).toBe(expCount);
    });

    it('should allow manual edit of the counter value', () => {
      // Arrange
      const counterSpan = compiled.querySelector(
        'span.counter-text',
      ) as HTMLSpanElement;

      // Act
      // Enter edit mode
      counterSpan.dispatchEvent(new Event('dblclick'));
      fixture.detectChanges();

      // Edit counter value
      const counterInput = compiled.querySelector('input') as HTMLInputElement;
      counterInput.valueAsNumber = 200;
      counterInput.dispatchEvent(new Event('input'));
      // counterInput.dispatchEvent(new Event('blur'));
      // fixture.detectChanges();

      // Assert
      // @ts-ignore
      expect(component._count).toEqual(200);
    });
  });

  describe('I/O', () => {
    it('should accept input values', () => {
      // Arrange
      const expGreeting = 'Hello, World!';
      const expCount = 5;

      // Act
      fixture.componentRef.setInput('greeting', expGreeting);
      fixture.componentRef.setInput('count', expCount);
      fixture.detectChanges();

      // Assert
      // @ts-ignore
      expect(component._count).toBe(expCount);
      expect(component.hello).toBe(expGreeting);
    });

    it('should output counter value update', () => {
      // Arrange
      let emittedCount = 0;
      // @ts-ignore
      component.countChange.subscribe((val) => (emittedCount = val));

      // Act
      component.increment();

      // Assert
      expect(emittedCount).toBe(1);
    });
  });
});
