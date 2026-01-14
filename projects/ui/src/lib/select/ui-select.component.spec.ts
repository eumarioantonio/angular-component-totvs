import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UiSelectComponent, SelectOption } from './ui-select.component';

describe('UiSelectComponent', () => {
  let component: UiSelectComponent;
  let fixture: ComponentFixture<UiSelectComponent>;
  let compiled: HTMLElement;

  const mockOptions: SelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4', disabled: true },
    { value: '5', label: 'Option 5' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiSelectComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.options = mockOptions;
    fixture.detectChanges();
  });

  describe('Component Creation and Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.value).toBeNull();
      expect(component.isOpen).toBeFalsy();
      expect(component.selectedOption).toBeNull();
      expect(component.focusedIndex).toBe(-1);
      expect(component.disabled).toBeFalsy();
      expect(component.hasError).toBeFalsy();
    });

    it('should display placeholder when there is no selection', () => {
      const trigger = compiled.querySelector('.select__trigger .select__label');
      expect(trigger?.textContent?.trim()).toBe('Choose an option');
    });

    it('should apply correct CSS class when disabled', () => {
      const newFixture = TestBed.createComponent(UiSelectComponent);
      const newComponent = newFixture.componentInstance;
      newComponent.disabled = true;
      newFixture.detectChanges();
      
      const container = newFixture.nativeElement.querySelector('.select-container');
      expect(container?.classList.contains('select--disabled')).toBeTruthy();
    });

    it('should apply correct CSS class when there is an error', () => {
      const newFixture = TestBed.createComponent(UiSelectComponent);
      const newComponent = newFixture.componentInstance;
      newComponent.hasError = true;
      newFixture.detectChanges();
      
      const container = newFixture.nativeElement.querySelector('.select-container');
      expect(container?.classList.contains('select--error')).toBeTruthy();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue correctly', () => {
      component.writeValue('2');
      fixture.detectChanges();
      
      expect(component.value).toBe('2');
      expect(component.selectedLabel).toBe('Option 2');
    });

    it('should call onChange when an option is selected', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      component.selectOption(mockOptions[0]);
      
      expect(onChangeSpy).toHaveBeenCalledWith('1');
    });

    it('should call onTouched when select is opened', () => {
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

    it('should update focusedIndex when writeValue is called', () => {
      component.writeValue('3');
      expect(component.focusedIndex).toBe(2); // índice da opção com value '3'
    });
  });

  describe('Dropdown Opening and Closing', () => {
    it('should open dropdown when clicking the button', () => {
      const trigger = compiled.querySelector('.select__trigger') as HTMLElement;
      trigger.click();
      fixture.detectChanges();
      
      expect(component.isOpen).toBeTruthy();
      expect(compiled.querySelector('.select__options')).toBeTruthy();
    });

    it('should close dropdown when clicking the button again', () => {
      component.isOpen = true;
      fixture.detectChanges();
      
      const trigger = compiled.querySelector('.select__trigger') as HTMLElement;
      trigger.click();
      fixture.detectChanges();
      
      expect(component.isOpen).toBeFalsy();
    });

    it('should not open dropdown when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      component.toggle();
      
      expect(component.isOpen).toBeFalsy();
    });

    it('should apply CSS class when open', () => {
      component.toggle();
      fixture.detectChanges();
      
      const container = compiled.querySelector('.select-container');
      expect(container?.classList.contains('select--open')).toBeTruthy();
    });

    it('should set aria-expanded correctly', () => {
      const trigger = compiled.querySelector('.select__trigger');
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
      
      component.toggle();
      fixture.detectChanges();
      
      expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should close when clicking outside the component', () => {
      component.isOpen = true;
      fixture.detectChanges();
      
      const event = new MouseEvent('click');
      document.dispatchEvent(event);
      fixture.detectChanges();
      
      expect(component.isOpen).toBeFalsy();
    });

    it('should not close when clicking inside the component', () => {
      component.isOpen = true;
      fixture.detectChanges();
      
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: compiled, configurable: true });
      component.onClickOutside(event);
      
      expect(component.isOpen).toBeTruthy();
    });
  });

  describe('Option Selection', () => {
    it('should select an option when clicking on it', () => {
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      (options[0] as HTMLElement).click();
      fixture.detectChanges();
      
      expect(component.value).toBe('1');
      expect(component.selectedLabel).toBe('Option 1');
      expect(component.isOpen).toBeFalsy();
    });

    it('should not select a disabled option', () => {
      component.selectOption(mockOptions[3]); // opção desabilitada
      
      expect(component.value).toBeNull();
      expect(component.selectedOption).toBeNull();
    });

    it('should emit selectionChange event when selecting', () => {
      spyOn(component.selectionChange, 'emit');
      
      component.selectOption(mockOptions[0]);
      
      expect(component.selectionChange.emit).toHaveBeenCalledWith(mockOptions[0]);
    });

    it('should mark selected option visually', () => {
      component.value = '2';
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      expect(options[1].classList.contains('select__option--selected')).toBeTruthy();
    });

    it('should set aria-selected on selected option', () => {
      component.value = '2';
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      expect(options[1].getAttribute('aria-selected')).toBe('true');
      expect(options[0].getAttribute('aria-selected')).toBe('false');
    });

    it('should not allow selection when component is disabled', () => {
      component.disabled = true;
      const initialValue = component.value;
      
      component.selectOption(mockOptions[0]);
      
      expect(component.value).toBe(initialValue);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should open dropdown when pressing Enter', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeyDown(event);
      fixture.detectChanges();
      
      expect(component.isOpen).toBeTruthy();
    });

    it('should open dropdown when pressing Space', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.onKeyDown(event);
      fixture.detectChanges();
      
      expect(component.isOpen).toBeTruthy();
    });

    it('should close dropdown when pressing Escape', () => {
      component.isOpen = true;
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKeyDown(event);
      fixture.detectChanges();
      
      expect(component.isOpen).toBeFalsy();
    });

    it('should select focused option when pressing Enter', () => {
      component.isOpen = true;
      component.focusedIndex = 1;
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeyDown(event);
      
      expect(component.value).toBe('2');
      expect(component.isOpen).toBeFalsy();
    });

    it('should move focus down when pressing ArrowDown', () => {
      component.isOpen = true;
      component.focusedIndex = 0;
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      
      expect(component.focusedIndex).toBe(1);
    });

    it('should move focus up when pressing ArrowUp', () => {
      component.isOpen = true;
      component.focusedIndex = 2;
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);
      
      expect(component.focusedIndex).toBe(1);
    });

    it('should skip disabled options when navigating down', () => {
      component.isOpen = true;
      component.focusedIndex = 2; // Option 3
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      
      // Deve pular a opção 4 (desabilitada) e ir para a 5
      expect(component.focusedIndex).toBe(4);
    });

    it('should skip disabled options when navigating up', () => {
      component.isOpen = true;
      component.focusedIndex = 4; // Option 5
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);
      
      // Deve pular a opção 4 (desabilitada) e ir para a 3
      expect(component.focusedIndex).toBe(2);
    });

    it('should go to first enabled option when pressing Home', () => {
      component.isOpen = true;
      component.focusedIndex = 4;
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      component.onKeyDown(event);
      
      expect(component.focusedIndex).toBe(0);
    });

    it('should go to last enabled option when pressing End', () => {
      component.isOpen = true;
      component.focusedIndex = 0;
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'End' });
      component.onKeyDown(event);
      
      expect(component.focusedIndex).toBe(4);
    });

    it('should not process keys when disabled', () => {
      component.disabled = true;
      const initialOpen = component.isOpen;
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeyDown(event);
      
      expect(component.isOpen).toBe(initialOpen);
    });

    it('should open dropdown when pressing ArrowDown while closed', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      
      expect(component.isOpen).toBeTruthy();
    });

    it('should open dropdown when pressing ArrowUp while closed', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);
      
      expect(component.isOpen).toBeTruthy();
    });
  });

  describe('Focus Management', () => {
    it('should mark focused option visually', () => {
      component.toggle();
      fixture.detectChanges();
      
      // Simula navegação com teclado que atualiza focusedIndex internamente
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      expect(options[component.focusedIndex].classList.contains('select__option--focused')).toBeTruthy();
    });

    it('should update focus when hovering over an option', () => {
      component.isOpen = true;
      fixture.detectChanges();
      
      component.onOptionHover(2);
      
      expect(component.focusedIndex).toBe(2);
    });

    it('should set focus on selected option when opening', () => {
      component.value = '3';
      component.toggle();
      
      expect(component.focusedIndex).toBe(2);
    });

    it('should set focus on first enabled option if there is no selection', () => {
      component.value = null;
      component.toggle();
      
      expect(component.focusedIndex).toBe(0);
    });
  });

  describe('Getters and Computed Properties', () => {
    it('selectedLabel should return placeholder when there is no selection', () => {
      component.placeholder = 'Selecione';
      component.value = null;
      
      expect(component.selectedLabel).toBe('Selecione');
    });

    it('selectedLabel should return the label of selected option', () => {
      component.value = '2';
      
      expect(component.selectedLabel).toBe('Option 2');
    });

    it('selectedLabel should return placeholder if value does not match any option', () => {
      component.placeholder = 'Selecione';
      component.value = 'inexistente';
      
      expect(component.selectedLabel).toBe('Selecione');
    });

    it('hasSelection should return true when there is a selected value', () => {
      component.value = '1';
      
      expect(component.hasSelection).toBeTruthy();
    });

    it('hasSelection should return false when there is no selected value', () => {
      component.value = null;
      
      expect(component.hasSelection).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('should have role="button" on trigger', () => {
      const trigger = compiled.querySelector('.select__trigger');
      expect(trigger?.getAttribute('role')).toBe('button');
    });

    it('should have role="listbox" on options list', () => {
      component.toggle();
      fixture.detectChanges();
      
      const list = compiled.querySelector('.select__options');
      expect(list?.getAttribute('role')).toBe('listbox');
    });

    it('should have role="option" on each option', () => {
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      options.forEach(option => {
        expect(option.getAttribute('role')).toBe('option');
      });
    });

    it('should set aria-haspopup on trigger', () => {
      const trigger = compiled.querySelector('.select__trigger');
      expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('should set aria-label on trigger and list', () => {
      const trigger = compiled.querySelector('.select__trigger');
      expect(trigger?.getAttribute('aria-label')).toBe('Choose an option');
      
      component.toggle();
      fixture.detectChanges();
      
      const list = compiled.querySelector('.select__options');
      expect(list?.getAttribute('aria-label')).toBe('Choose an option');
    });

    it('should set aria-disabled on disabled options', () => {
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      expect(options[3].getAttribute('aria-disabled')).toBe('true');
      // Opções habilitadas não têm o atributo aria-disabled ou têm valor 'false'
      const disabledAttr = options[0].getAttribute('aria-disabled');
      expect(disabledAttr === 'false' || disabledAttr === null).toBeTruthy();
    });

    it('should mark disabled options with CSS class', () => {
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      expect(options[3].classList.contains('select__option--disabled')).toBeTruthy();
    });
  });

  describe('Options List Interaction', () => {
    it('should render all options when open', () => {
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      expect(options.length).toBe(mockOptions.length);
    });

    it('should not render list when closed', () => {
      expect(compiled.querySelector('.select__options')).toBeNull();
    });

    it('should display correct option labels', () => {
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      expect(options[0].textContent?.trim()).toBe('Option 1');
      expect(options[1].textContent?.trim()).toBe('Option 2');
    });
  });

  describe('ngOnInit', () => {
    it('should set focusedIndex if there is already an initial value', () => {
      const newFixture = TestBed.createComponent(UiSelectComponent);
      const newComponent = newFixture.componentInstance;
      newComponent.options = mockOptions;
      newComponent.value = '3';
      
      newComponent.ngOnInit();
      
      expect(newComponent.focusedIndex).toBe(2);
    });

    it('should not change focusedIndex if there is no initial value', () => {
      const newFixture = TestBed.createComponent(UiSelectComponent);
      const newComponent = newFixture.componentInstance;
      newComponent.options = mockOptions;
      newComponent.value = null;
      
      newComponent.ngOnInit();
      
      expect(newComponent.focusedIndex).toBe(-1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty options list', () => {
      component.options = [];
      fixture.detectChanges();
      
      component.toggle();
      fixture.detectChanges();
      
      const options = compiled.querySelectorAll('.select__option');
      expect(options.length).toBe(0);
    });

    it('should handle all options disabled', () => {
      component.options = [
        { value: '1', label: 'Option 1', disabled: true },
        { value: '2', label: 'Option 2', disabled: true }
      ];
      component.toggle();
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      
      expect(component.focusedIndex).toBe(-1);
    });

    it('should rotate icon when open', () => {
      component.toggle();
      fixture.detectChanges();
      
      const icon = compiled.querySelector('.select__icon');
      expect(icon?.classList.contains('select__icon--rotated')).toBeTruthy();
    });

    it('should apply has-value class when there is a selection', () => {
      component.writeValue('1');
      fixture.detectChanges();
      
      const trigger = compiled.querySelector('.select__trigger');
      expect(trigger?.classList.contains('select__trigger--has-value')).toBeTruthy();
    });
  });
});
