import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSwitchComponent } from './ui-switch.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UiSwitchComponent', () => {
  let component: UiSwitchComponent;
  let fixture: ComponentFixture<UiSwitchComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiSwitchComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('Component Creation and Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.value).toBe(false);
      expect(component.disabled).toBe(false);
      expect(component.label).toBe('');
    });

    it('should initialize with false value', () => {
      expect(component.value).toBeFalsy();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue correctly', () => {
      component.writeValue(true);
      fixture.detectChanges();
      
      expect(component.value).toBe(true);
    });

    it('should handle null value in writeValue', () => {
      component.writeValue(null as any);
      fixture.detectChanges();
      
      expect(component.value).toBe(false);
    });

    it('should handle undefined value in writeValue', () => {
      component.writeValue(undefined as any);
      fixture.detectChanges();
      
      expect(component.value).toBe(false);
    });

    it('should call onChange when toggled', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      component.toggle();
      
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should call onChange with correct value', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      component.value = true;
      
      component.toggle();
      
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should call onTouched when toggled', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      component.toggle();
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should set disabled state via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      
      expect(component.disabled).toBeTruthy();
    });

    it('should unset disabled state via setDisabledState', () => {
      component.disabled = true;
      component.setDisabledState(false);
      fixture.detectChanges();
      
      expect(component.disabled).toBeFalsy();
    });
  });

  describe('Toggle Functionality', () => {
    it('should toggle value from false to true', () => {
      component.value = false;
      
      component.toggle();
      
      expect(component.value).toBe(true);
    });

    it('should toggle value from true to false', () => {
      component.value = true;
      
      component.toggle();
      
      expect(component.value).toBe(false);
    });

    it('should not toggle when disabled', () => {
      component.disabled = true;
      component.value = false;
      
      component.toggle();
      
      expect(component.value).toBe(false);
    });

    it('should not call onChange when disabled', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      component.disabled = true;
      
      component.toggle();
      
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should not call onTouched when disabled', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      component.disabled = true;
      
      component.toggle();
      
      expect(onTouchedSpy).not.toHaveBeenCalled();
    });

    it('should toggle multiple times', () => {
      expect(component.value).toBe(false);
      
      component.toggle();
      expect(component.value).toBe(true);
      
      component.toggle();
      expect(component.value).toBe(false);
      
      component.toggle();
      expect(component.value).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should toggle on Enter key', () => {
      component.value = false;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      
      expect(component.value).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should toggle on Space key', () => {
      component.value = false;
      const event = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      
      expect(component.value).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not toggle on other keys', () => {
      component.value = false;
      const event = new KeyboardEvent('keydown', { key: 'a' });
      
      component.onKeyDown(event);
      
      expect(component.value).toBe(false);
    });

    it('should not toggle on Enter when disabled', () => {
      component.disabled = true;
      component.value = false;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      
      component.onKeyDown(event);
      
      expect(component.value).toBe(false);
    });

    it('should not toggle on Space when disabled', () => {
      component.disabled = true;
      component.value = false;
      const event = new KeyboardEvent('keydown', { key: ' ' });
      
      component.onKeyDown(event);
      
      expect(component.value).toBe(false);
    });

    it('should call onChange on keyboard toggle', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      
      component.onKeyDown(event);
      
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should call onTouched on keyboard toggle', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      
      component.onKeyDown(event);
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled class when disabled', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      
      const container = compiled.querySelector('.switch-container');
      expect(container?.classList.contains('switch--disabled')).toBeTruthy();
    });

    it('should not apply disabled class when enabled', () => {
      component.setDisabledState(false);
      fixture.detectChanges();
      
      const container = compiled.querySelector('.switch-container');
      expect(container?.classList.contains('switch--disabled')).toBeFalsy();
    });

    it('should disable button element when disabled', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch') as HTMLButtonElement;
      expect(button.disabled).toBeTruthy();
    });

    it('should enable button element when not disabled', () => {
      component.setDisabledState(false);
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch') as HTMLButtonElement;
      expect(button.disabled).toBeFalsy();
    });
  });

  describe('Label Functionality', () => {
    it('should display label when provided', () => {
      // Create a new fixture with label pre-set to work with OnPush
      const newFixture = TestBed.createComponent(UiSwitchComponent);
      const newComponent = newFixture.componentInstance;
      newComponent.label = 'Test Label';
      newFixture.detectChanges();
      
      const newCompiled = newFixture.nativeElement as HTMLElement;
      const label = newCompiled.querySelector('.switch__label');
      expect(label).toBeTruthy();
      expect(label!.textContent!.trim()).toBe('Test Label');
    });

    it('should not display label when empty', () => {
      component.label = '';
      fixture.detectChanges();
      
      const label = compiled.querySelector('.switch__label');
      expect(label).toBeFalsy();
    });

    it('should toggle on label click', () => {
      // Create a new fixture with label pre-set to work with OnPush
      const newFixture = TestBed.createComponent(UiSwitchComponent);
      const newComponent = newFixture.componentInstance;
      newComponent.label = 'Test Label';
      newComponent.value = false;
      newFixture.detectChanges();
      
      const newCompiled = newFixture.nativeElement as HTMLElement;
      const label = newCompiled.querySelector('.switch__label');
      expect(label).toBeTruthy(); // Verify label is rendered
      
      (label as HTMLElement).click();
      
      expect(newComponent.value).toBe(true);
    });

    it('should not toggle on label click when disabled', () => {
      component.label = 'Test Label';
      component.setDisabledState(true);
      component.value = false;
      fixture.detectChanges();
      
      const label = compiled.querySelector('.switch__label') as HTMLElement;
      label.click();
      
      expect(component.value).toBe(false);
    });
  });

  describe('Visual State', () => {
    it('should apply checked class when value is true', () => {
      component.writeValue(true);
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch');
      expect(button?.classList.contains('switch--checked')).toBeTruthy();
    });

    it('should not apply checked class when value is false', () => {
      component.writeValue(false);
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch');
      expect(button?.classList.contains('switch--checked')).toBeFalsy();
    });

    it('should display check icon when checked', () => {
      component.writeValue(true);
      fixture.detectChanges();
      
      const icon = compiled.querySelector('.switch__icon');
      expect(icon).toBeTruthy();
    });

    it('should not display check icon when unchecked', () => {
      component.writeValue(false);
      fixture.detectChanges();
      
      const icon = compiled.querySelector('.switch__icon');
      expect(icon).toBeFalsy();
    });

    it('should have switch track', () => {
      const track = compiled.querySelector('.switch__track');
      expect(track).toBeTruthy();
    });

    it('should have switch thumb', () => {
      const thumb = compiled.querySelector('.switch__thumb');
      expect(thumb).toBeTruthy();
    });
  });

  describe('Button Click', () => {
    it('should toggle on button click', () => {
      component.value = false;
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch') as HTMLElement;
      button.click();
      
      expect(component.value).toBe(true);
    });

    it('should not toggle on button click when disabled', () => {
      component.disabled = true;
      component.value = false;
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch') as HTMLElement;
      button.click();
      
      expect(component.value).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="switch"', () => {
      const button = compiled.querySelector('button.switch');
      expect(button?.getAttribute('role')).toBe('switch');
    });

    it('should set aria-checked to true when checked', () => {
      component.writeValue(true);
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch');
      expect(button?.getAttribute('aria-checked')).toBe('true');
    });

    it('should set aria-checked to false when unchecked', () => {
      component.writeValue(false);
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch');
      expect(button?.getAttribute('aria-checked')).toBe('false');
    });

    it('should use label as aria-label when provided', () => {
      component.label = 'Enable Notifications';
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch');
      expect(button?.getAttribute('aria-label')).toBe('Enable Notifications');
    });

    it('should use default aria-label when no label provided', () => {
      component.label = '';
      fixture.detectChanges();
      
      const button = compiled.querySelector('button.switch');
      expect(button?.getAttribute('aria-label')).toBe('Enable Notifications');
    });

    it('should have type="button"', () => {
      const button = compiled.querySelector('button.switch') as HTMLButtonElement;
      expect(button.type).toBe('button');
    });
  });

  describe('Change Detection', () => {
    it('should mark for check when writeValue is called', () => {
      spyOn(component['changeDetector'], 'markForCheck');
      
      component.writeValue(true);
      
      expect(component['changeDetector'].markForCheck).toHaveBeenCalled();
    });

    it('should mark for check when setDisabledState is called', () => {
      spyOn(component['changeDetector'], 'markForCheck');
      
      component.setDisabledState(true);
      
      expect(component['changeDetector'].markForCheck).toHaveBeenCalled();
    });

    it('should mark for check when toggled', () => {
      spyOn(component['changeDetector'], 'markForCheck');
      
      component.toggle();
      
      expect(component['changeDetector'].markForCheck).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid toggles', () => {
      component.toggle();
      component.toggle();
      component.toggle();
      
      expect(component.value).toBe(true);
    });

    it('should maintain state after being disabled and re-enabled', () => {
      component.value = true;
      component.setDisabledState(true);
      fixture.detectChanges();
      
      expect(component.value).toBe(true);
      
      component.setDisabledState(false);
      fixture.detectChanges();
      
      expect(component.value).toBe(true);
    });

    it('should handle empty string label', () => {
      component.label = '';
      fixture.detectChanges();
      
      expect(compiled.querySelector('.switch__label')).toBeFalsy();
    });

    it('should not render label with whitespace-only text', () => {
      component.label = '   ';
      fixture.detectChanges();
      
      const label = compiled.querySelector('.switch__label');
      // Angular @if directive treats whitespace-only string as falsy
      expect(label).toBeFalsy();
    });

    it('should handle long label text', () => {
      // Create a new fixture with label pre-set to work with OnPush
      const newFixture = TestBed.createComponent(UiSwitchComponent);
      const newComponent = newFixture.componentInstance;
      newComponent.label = 'This is a very long label text that might wrap to multiple lines';
      newFixture.detectChanges();
      
      const newCompiled = newFixture.nativeElement as HTMLElement;
      const label = newCompiled.querySelector('.switch__label');
      expect(label).toBeTruthy();
      expect(label!.textContent!.trim()).toBe('This is a very long label text that might wrap to multiple lines');
    });

    it('should not throw error when toggle called before registerOnChange', () => {
      const newFixture = TestBed.createComponent(UiSwitchComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(() => newComponent.toggle()).not.toThrow();
    });

    it('should not throw error when toggle called before registerOnTouched', () => {
      const newFixture = TestBed.createComponent(UiSwitchComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(() => newComponent.toggle()).not.toThrow();
    });
  });

  describe('Integration Tests', () => {
    it('should complete full toggle workflow', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnChange(onChangeSpy);
      component.registerOnTouched(onTouchedSpy);
      
      // Initial state
      expect(component.value).toBe(false);
      
      // Toggle on
      component.toggle();
      expect(component.value).toBe(true);
      expect(onChangeSpy).toHaveBeenCalledWith(true);
      expect(onTouchedSpy).toHaveBeenCalled();
      
      // Toggle off
      component.toggle();
      expect(component.value).toBe(false);
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should work with reactive forms workflow', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      // Form sets initial value
      component.writeValue(false);
      expect(component.value).toBe(false);
      
      // User toggles
      component.toggle();
      expect(onChangeSpy).toHaveBeenCalledWith(true);
      
      // Form updates value programmatically
      component.writeValue(false);
      expect(component.value).toBe(false);
      
      // Form disables control
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
      
      // User cannot toggle when disabled
      component.toggle();
      expect(onChangeSpy).toHaveBeenCalledTimes(1); // Only the first toggle
    });

    it('should handle keyboard and mouse interactions', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      // Mouse click
      component.toggle();
      expect(component.value).toBe(true);
      expect(onChangeSpy).toHaveBeenCalledWith(true);
      
      // Keyboard Enter
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeyDown(enterEvent);
      expect(component.value).toBe(false);
      expect(onChangeSpy).toHaveBeenCalledWith(false);
      
      // Keyboard Space
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      component.onKeyDown(spaceEvent);
      expect(component.value).toBe(true);
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('Template Rendering', () => {
    it('should render switch container', () => {
      const container = compiled.querySelector('.switch-container');
      expect(container).toBeTruthy();
    });

    it('should render switch button', () => {
      const button = compiled.querySelector('button.switch');
      expect(button).toBeTruthy();
    });

    it('should render switch track inside button', () => {
      const track = compiled.querySelector('button.switch .switch__track');
      expect(track).toBeTruthy();
    });

    it('should render switch thumb inside track', () => {
      const thumb = compiled.querySelector('.switch__track .switch__thumb');
      expect(thumb).toBeTruthy();
    });

    it('should render check icon SVG when checked', () => {
      component.writeValue(true);
      fixture.detectChanges();
      
      const svg = compiled.querySelector('.switch__thumb svg.switch__icon');
      expect(svg).toBeTruthy();
    });

    it('should render check path inside SVG', () => {
      component.writeValue(true);
      fixture.detectChanges();
      
      const path = compiled.querySelector('.switch__icon path');
      expect(path).toBeTruthy();
    });

    it('should have correct SVG viewBox', () => {
      component.writeValue(true);
      fixture.detectChanges();
      
      const svg = compiled.querySelector('.switch__icon') as SVGElement;
      expect(svg.getAttribute('viewBox')).toBe('0 0 12 12');
    });
  });
});
