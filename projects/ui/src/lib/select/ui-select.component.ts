import { Component, Input, forwardRef, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelectComponent),
      multi: true
    }
  ]
})
export class UiSelectComponent implements ControlValueAccessor {
  private changeDetector = inject(ChangeDetectorRef);
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Choose an option';
  @Input() disabled = false;
  @Input() hasError = false;
  @Output() selectionChange = new EventEmitter<SelectOption | null>();

  @ViewChild('selectButton') selectButton!: ElementRef;
  @ViewChild('optionsList', { static: false }) optionsList!: ElementRef;

  value: any = null;
  isOpen = false;
  selectedOption: SelectOption | null = null;
  focusedIndex = -1;
  

  get selectedLabel(): string {
    if (this.value === null) return this.placeholder;
    
    const selected = this.options.find(opt => opt.value === this.value);
    return selected ? selected.label : this.placeholder;
  }

  get hasSelection(): boolean {
    return this.value !== null;
  }

  constructor(
    public cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    if (this.value !== null) {
      this.focusedIndex = this.options.findIndex(opt => opt.value === this.value);
    }
  }

   writeValue(value: any): void {
    this.value = value;
    
    if (value !== null) {
      this.focusedIndex = this.options.findIndex(opt => opt.value === value);
    }
    
     this.changeDetector.detectChanges();;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
     this.changeDetector.detectChanges();;
  }

  toggle(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.focusedIndex = this.value !== null 
        ? this.options.findIndex(opt => opt.value === this.value)
        : this.getFirstEnabledIndex();
      
      this.onTouched();
      
      setTimeout(() => this.scrollToFocusedOption(), 0);
    }
    
     this.changeDetector.detectChanges();;
  }

  selectOption(option: SelectOption): void {
    if (this.disabled) return;
    if (!option.disabled) {
      this.value = option.value;
      this.selectedOption = option;
      this.onChange(option.value);
      this.onTouched();
      this.selectionChange.emit(option);
      this.isOpen = false;
      this.changeDetector.detectChanges();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.isOpen = false;
         this.changeDetector.detectChanges();;
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen && this.focusedIndex >= 0) {
          this.selectOption(this.options[this.focusedIndex]);
        } else {
          this.toggle();
        }
        break;

      case 'Escape':
        event.preventDefault();
        if (this.isOpen) {
          this.isOpen = false;
           this.changeDetector.detectChanges();;
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggle();
        } else {
          this.moveFocusDown();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggle();
        } else {
          this.moveFocusUp();
        }
        break;

      case 'Home':
        event.preventDefault();
        if (this.isOpen) {
          this.focusedIndex = this.getFirstEnabledIndex();
          this.scrollToFocusedOption();
           this.changeDetector.detectChanges();;
        }
        break;

      case 'End':
        event.preventDefault();
        if (this.isOpen) {
          this.focusedIndex = this.getLastEnabledIndex();
          this.scrollToFocusedOption();
           this.changeDetector.detectChanges();;
        }
        break;
    }
  }

  private moveFocusDown(): void {
    let nextIndex = this.focusedIndex + 1;
    
    while (nextIndex < this.options.length) {
      if (!this.options[nextIndex].disabled) {
        this.focusedIndex = nextIndex;
        this.scrollToFocusedOption();
         this.changeDetector.detectChanges();;
        return;
      }
      nextIndex++;
    }
  }

  private moveFocusUp(): void {
    let prevIndex = this.focusedIndex - 1;
    
    while (prevIndex >= 0) {
      if (!this.options[prevIndex].disabled) {
        this.focusedIndex = prevIndex;
        this.scrollToFocusedOption();
         this.changeDetector.detectChanges();;
        return;
      }
      prevIndex--;
    }
  }

  private getFirstEnabledIndex(): number {
    return this.options.findIndex(opt => !opt.disabled);
  }

  private getLastEnabledIndex(): number {
    for (let i = this.options.length - 1; i >= 0; i--) {
      if (!this.options[i].disabled) return i;
    }
    return -1;
  }

  private scrollToFocusedOption(): void {
    if (!this.optionsList) return;
    
    const listElement = this.optionsList.nativeElement;
    const focusedElement = listElement.children[this.focusedIndex] as HTMLElement;
    
    if (focusedElement) {
      focusedElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }
}
