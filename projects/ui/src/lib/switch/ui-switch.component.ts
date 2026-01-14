import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-switch',
  templateUrl: './ui-switch.component.html',
  styleUrl: './ui-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSwitchComponent),
      multi: true,
    },
  ],
})
export class UiSwitchComponent implements ControlValueAccessor {
  private changeDetector = inject(ChangeDetectorRef);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  @Input() disabled = false;
  @Input() label = '';

  value: boolean = false;

  writeValue(value: boolean): void {
    this.value = value ?? false;
    this.changeDetector.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.changeDetector.markForCheck();
  }

  toggle(): void {
    if (this.disabled) return;
    
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
    
    this.changeDetector.markForCheck();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }
}
