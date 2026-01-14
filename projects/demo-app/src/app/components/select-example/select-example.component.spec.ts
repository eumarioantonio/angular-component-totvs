import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SelectExampleComponent } from './select-example.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SelectExampleComponent', () => {
  let component: SelectExampleComponent;
  let fixture: ComponentFixture<SelectExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectExampleComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with statusDisabled as true', () => {
      expect(component.statusDisabled).toBe(true);
    });

    it('should initialize with empty savedMessage', () => {
      expect(component.savedMessage).toBe('');
    });

    it('should initialize countryOptions with 5 countries', () => {
      expect(component.countryOptions.length).toBe(5);
      expect(component.countryOptions).toEqual([
        { value: 'br', label: 'Brasil' },
        { value: 'us', label: 'Estados Unidos' },
        { value: 'uk', label: 'Reino Unido' },
        { value: 'jp', label: 'Japão' },
        { value: 'de', label: 'Alemanha' },
      ]);
    });

    it('should initialize categoryOptions with 4 categories', () => {
      expect(component.categoryOptions.length).toBe(4);
      expect(component.categoryOptions).toEqual([
        { value: 'tech', label: 'Tecnologia' },
        { value: 'finance', label: 'Finanças' },
        { value: 'health', label: 'Saúde' },
        { value: 'education', label: 'Educação' },
      ]);
    });

    it('should initialize statusOptions with 3 status', () => {
      expect(component.statusOptions.length).toBe(3);
      expect(component.statusOptions).toEqual([
        { value: 'active', label: 'Ativo' },
        { value: 'inactive', label: 'Inativo' },
        { value: 'pending', label: 'Pendente' },
      ]);
    });
  });

  describe('Form Initialization - ngOnInit', () => {
    it('should initialize testForm on ngOnInit', () => {
      expect(component.testForm).toBeDefined();
      expect(component.testForm).toBeTruthy();
    });

    it('should create form with country field', () => {
      const countryControl = component.testForm.get('country');
      expect(countryControl).toBeTruthy();
    });

    it('should create form with category field', () => {
      const categoryControl = component.testForm.get('category');
      expect(categoryControl).toBeTruthy();
    });

    it('should create form with status field', () => {
      const statusControl = component.testForm.get('status');
      expect(statusControl).toBeTruthy();
    });

    it('should set country field as required', () => {
      const countryControl = component.testForm.get('country');
      expect(countryControl?.hasError('required')).toBe(true);
    });

    it('should initialize country field as empty', () => {
      const countryControl = component.testForm.get('country');
      expect(countryControl?.value).toBe('');
    });

    it('should initialize category field as empty', () => {
      const categoryControl = component.testForm.get('category');
      expect(categoryControl?.value).toBe('');
    });

    it('should initialize status field with "active" value', () => {
      const statusControl = component.testForm.get('status');
      expect(statusControl?.value).toBe('active');
    });

    it('should initialize status field as disabled', () => {
      const statusControl = component.testForm.get('status');
      expect(statusControl?.disabled).toBe(true);
    });

    it('should have invalid form initially', () => {
      expect(component.testForm.valid).toBe(false);
    });

    it('should not set validators on category field', () => {
      const categoryControl = component.testForm.get('category');
      categoryControl?.setValue('');
      expect(categoryControl?.valid).toBe(true);
    });
  });

  describe('Form Validation', () => {
    it('should be invalid when country is empty', () => {
      component.testForm.patchValue({ country: '' });
      expect(component.testForm.valid).toBe(false);
    });

    it('should be valid when country is filled', () => {
      component.testForm.patchValue({ country: 'br' });
      expect(component.testForm.valid).toBe(true);
    });

    it('should mark country as touched and show error', () => {
      const countryControl = component.testForm.get('country');
      countryControl?.markAsTouched();
      expect(countryControl?.invalid && countryControl?.touched).toBe(true);
    });

    it('should be valid with only country filled', () => {
      component.testForm.patchValue({ 
        country: 'br',
        category: '',
        status: ''
      });
      expect(component.testForm.valid).toBe(true);
    });

    it('should be valid with all fields filled', () => {
      component.testForm.patchValue({ 
        country: 'br',
        category: 'tech',
      });
      component.testForm.get('status')?.setValue('active');
      expect(component.testForm.valid).toBe(true);
    });
  });

  describe('onSubmit Method', () => {
    it('should not submit when form is invalid', () => {
      spyOn(console, 'log');
      component.testForm.patchValue({ country: '' });
      
      component.onSubmit();
      
      expect(console.log).not.toHaveBeenCalled();
      expect(component.savedMessage).toBe('');
    });

    it('should submit and log form values when valid', () => {
      spyOn(console, 'log');
      component.testForm.patchValue({ country: 'br' });
      
      component.onSubmit();
      
      expect(console.log).toHaveBeenCalledWith('Form Submitted:', component.testForm.value);
    });

    it('should set savedMessage when form is valid', () => {
      component.testForm.patchValue({ country: 'br' });
      
      component.onSubmit();
      
      expect(component.savedMessage).toBe('✅ Formulário enviado com sucesso!');
    });

    it('should clear savedMessage after 3 seconds', fakeAsync(() => {
      component.testForm.patchValue({ country: 'br' });
      
      component.onSubmit();
      expect(component.savedMessage).toBe('✅ Formulário enviado com sucesso!');
      
      tick(3000);
      expect(component.savedMessage).toBe('');
    }));

    it('should not clear savedMessage before 3 seconds', fakeAsync(() => {
      component.testForm.patchValue({ country: 'br' });
      
      component.onSubmit();
      expect(component.savedMessage).toBe('✅ Formulário enviado com sucesso!');
      
      tick(2999);
      expect(component.savedMessage).toBe('✅ Formulário enviado com sucesso!');
      
      tick(1);
      expect(component.savedMessage).toBe('');
    }));

    it('should submit with complete form data', () => {
      spyOn(console, 'log');
      component.testForm.patchValue({ 
        country: 'us',
        category: 'finance'
      });
      
      component.onSubmit();
      
      expect(console.log).toHaveBeenCalledWith('Form Submitted:', jasmine.objectContaining({
        country: 'us',
        category: 'finance'
      }));
    });
  });

  describe('resetForm Method', () => {
    it('should reset form to initial state', () => {
      component.testForm.patchValue({ 
        country: 'br',
        category: 'tech'
      });
      
      component.resetForm();
      
      expect(component.testForm.get('country')?.value).toBeNull();
      expect(component.testForm.get('category')?.value).toBeNull();
    });

    it('should clear savedMessage', () => {
      component.savedMessage = '✅ Formulário enviado com sucesso!';
      
      component.resetForm();
      
      expect(component.savedMessage).toBe('');
    });

    it('should mark form as pristine', () => {
      component.testForm.patchValue({ country: 'br' });
      component.testForm.markAsDirty();
      
      component.resetForm();
      
      expect(component.testForm.pristine).toBe(true);
    });

    it('should mark form as untouched', () => {
      component.testForm.get('country')?.markAsTouched();
      
      component.resetForm();
      
      expect(component.testForm.untouched).toBe(true);
    });
  });

  describe('toggleStatus Method', () => {
    it('should toggle statusDisabled from true to false', () => {
      component.statusDisabled = true;
      
      component.toggleStatus();
      
      expect(component.statusDisabled).toBe(false);
    });

    it('should toggle statusDisabled from false to true', () => {
      component.statusDisabled = false;
      
      component.toggleStatus();
      
      expect(component.statusDisabled).toBe(true);
    });

    it('should enable status control when statusDisabled is false', () => {
      component.statusDisabled = true;
      
      component.toggleStatus();
      
      const statusControl = component.testForm.get('status');
      expect(statusControl?.disabled).toBe(false);
    });

    it('should disable status control when statusDisabled is true', () => {
      component.statusDisabled = false;
      component.testForm.get('status')?.enable();
      
      component.toggleStatus();
      
      const statusControl = component.testForm.get('status');
      expect(statusControl?.disabled).toBe(true);
    });

    it('should toggle multiple times correctly', () => {
      component.statusDisabled = true;
      
      component.toggleStatus();
      expect(component.statusDisabled).toBe(false);
      
      component.toggleStatus();
      expect(component.statusDisabled).toBe(true);
      
      component.toggleStatus();
      expect(component.statusDisabled).toBe(false);
    });
  });

  describe('patchValue Method', () => {
    it('should patch country value to "br"', () => {
      component.patchValue();
      
      expect(component.testForm.get('country')?.value).toBe('br');
    });

    it('should patch category value to "tech"', () => {
      component.patchValue();
      
      expect(component.testForm.get('category')?.value).toBe('tech');
    });

    it('should patch status value to "active"', () => {
      component.patchValue();
      
      expect(component.testForm.get('status')?.value).toBe('active');
    });

    it('should make form valid after patching values', () => {
      component.testForm.patchValue({ country: '' });
      expect(component.testForm.valid).toBe(false);
      
      component.patchValue();
      
      expect(component.testForm.valid).toBe(true);
    });

    it('should override previous values', () => {
      component.testForm.patchValue({ 
        country: 'us',
        category: 'finance'
      });
      
      component.patchValue();
      
      expect(component.testForm.get('country')?.value).toBe('br');
      expect(component.testForm.get('category')?.value).toBe('tech');
    });
  });

  describe('Template Rendering', () => {
    it('should render form title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.settings-title');
      expect(title?.textContent).toContain('Reactive Forms com Select');
    });

    it('should render form subtitle', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const subtitle = compiled.querySelector('.settings-subtitle');
      expect(subtitle?.textContent).toContain('Exemplo completo de formulário com validações');
    });

    it('should not display savedMessage initially', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const message = compiled.querySelector('.success-message');
      expect(message).toBeFalsy();
    });

    it('should display savedMessage when set', () => {
      component.savedMessage = '✅ Formulário enviado com sucesso!';
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const message = compiled.querySelector('.success-message');
      expect(message?.textContent).toContain('✅ Formulário enviado com sucesso!');
    });

    it('should render all three ui-select components', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const selects = compiled.querySelectorAll('ui-select');
      expect(selects.length).toBe(3);
    });

    it('should render error message when country is invalid and touched', () => {
      const countryControl = component.testForm.get('country');
      countryControl?.markAsTouched();
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage?.textContent).toContain('Campo obrigatório');
    });

    it('should not render error message when country is valid', () => {
      component.testForm.patchValue({ country: 'br' });
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage).toBeFalsy();
    });

    it('should render all four action buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.form-actions button');
      expect(buttons.length).toBe(4);
    });

    it('should disable submit button when form is invalid', () => {
      component.testForm.patchValue({ country: '' });
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(submitButton.disabled).toBe(true);
    });

    it('should enable submit button when form is valid', () => {
      component.testForm.patchValue({ country: 'br' });
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(submitButton.disabled).toBe(false);
    });

    it('should display "Habilitar Status" when statusDisabled is true', () => {
      component.statusDisabled = true;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.btn--secondary');
      const toggleButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Status')
      );
      expect(toggleButton?.textContent).toContain('Habilitar');
    });

    it('should display "Desabilitar Status" when statusDisabled is false', () => {
      component.statusDisabled = false;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.btn--secondary');
      const toggleButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Status')
      );
      expect(toggleButton?.textContent).toContain('Desabilitar');
    });

    it('should call resetForm when reset button is clicked', () => {
      spyOn(component, 'resetForm');
      
      const compiled = fixture.nativeElement as HTMLElement;
      const resetButton = Array.from(compiled.querySelectorAll('.btn--secondary'))
        .find(btn => btn.textContent?.includes('Resetaurar')) as HTMLElement;
      
      resetButton.click();
      
      expect(component.resetForm).toHaveBeenCalled();
    });

    it('should call toggleStatus when toggle button is clicked', () => {
      spyOn(component, 'toggleStatus');
      
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleButton = Array.from(compiled.querySelectorAll('.btn--secondary'))
        .find(btn => btn.textContent?.includes('Status')) as HTMLElement;
      
      toggleButton.click();
      
      expect(component.toggleStatus).toHaveBeenCalled();
    });

    it('should call patchValue when fill button is clicked', () => {
      spyOn(component, 'patchValue');
      
      const compiled = fixture.nativeElement as HTMLElement;
      const fillButton = Array.from(compiled.querySelectorAll('.btn'))
        .find(btn => btn.textContent?.includes('Preencher')) as HTMLElement;
      
      fillButton.click();
      
      expect(component.patchValue).toHaveBeenCalled();
    });

    it('should call onSubmit when form is submitted', () => {
      spyOn(component, 'onSubmit');
      component.testForm.patchValue({ country: 'br' });
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('form') as HTMLFormElement;
      
      form.dispatchEvent(new Event('submit'));
      
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should display form debug information', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const debugTitle = compiled.querySelector('.debug-title');
      expect(debugTitle?.textContent).toContain('Estado do Formulário');
    });

    it('should display form valid status in debug', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const validBadge = Array.from(compiled.querySelectorAll('.debug-badge'))
        .find(badge => badge.textContent?.includes('Valid'));
      expect(validBadge).toBeTruthy();
    });
  });

  describe('Integration Tests', () => {
    it('should complete full form workflow', fakeAsync(() => {
      expect(component.testForm.valid).toBe(false);
      component.patchValue();
      expect(component.testForm.valid).toBe(true);
      
      component.onSubmit();
      expect(component.savedMessage).toBe('✅ Formulário enviado com sucesso!');
      
      tick(3000);
      expect(component.savedMessage).toBe('');
      
      component.resetForm();
      expect(component.testForm.get('country')?.value).toBeNull();
    }));

    it('should handle status toggle and form submission', () => {
      component.toggleStatus();
      expect(component.statusDisabled).toBe(false);
      expect(component.testForm.get('status')?.disabled).toBe(false);
      
      component.testForm.patchValue({ 
        country: 'br',
        category: 'tech'
      });
      component.testForm.get('status')?.setValue('pending');
      
      component.onSubmit();
      expect(component.savedMessage).toBe('✅ Formulário enviado com sucesso!');
      
      component.toggleStatus();
      expect(component.statusDisabled).toBe(true);
      expect(component.testForm.get('status')?.disabled).toBe(true);
    });
  });
});
