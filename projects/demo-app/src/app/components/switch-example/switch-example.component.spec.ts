import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SwitchExampleComponent } from './switch-example.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SwitchExampleComponent', () => {
  let component: SwitchExampleComponent;
  let fixture: ComponentFixture<SwitchExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchExampleComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty savedMessage', () => {
      expect(component.savedMessage).toBe('');
    });
  });

  describe('Form Initialization - ngOnInit', () => {
    it('should initialize notificationForm on ngOnInit', () => {
      expect(component.notificationForm).toBeDefined();
      expect(component.notificationForm).toBeTruthy();
    });

    it('should create form with enableNotifications field', () => {
      const control = component.notificationForm.get('enableNotifications');
      expect(control).toBeTruthy();
    });

    it('should create form with emailNotifications field', () => {
      const control = component.notificationForm.get('emailNotifications');
      expect(control).toBeTruthy();
    });

    it('should create form with pushNotifications field', () => {
      const control = component.notificationForm.get('pushNotifications');
      expect(control).toBeTruthy();
    });

    it('should create form with smsNotifications field', () => {
      const control = component.notificationForm.get('smsNotifications');
      expect(control).toBeTruthy();
    });

    it('should create form with marketingEmails field', () => {
      const control = component.notificationForm.get('marketingEmails');
      expect(control).toBeTruthy();
    });

    it('should create form with securityAlerts field', () => {
      const control = component.notificationForm.get('securityAlerts');
      expect(control).toBeTruthy();
    });

    it('should create form with productUpdates field', () => {
      const control = component.notificationForm.get('productUpdates');
      expect(control).toBeTruthy();
    });

    it('should create form with darkMode field', () => {
      const control = component.notificationForm.get('darkMode');
      expect(control).toBeTruthy();
    });

    it('should create form with soundEffects field', () => {
      const control = component.notificationForm.get('soundEffects');
      expect(control).toBeTruthy();
    });

    it('should initialize enableNotifications as true', () => {
      const control = component.notificationForm.get('enableNotifications');
      expect(control?.value).toBe(true);
    });

    it('should initialize emailNotifications as true', () => {
      const control = component.notificationForm.get('emailNotifications');
      expect(control?.value).toBe(true);
    });

    it('should initialize pushNotifications as false', () => {
      const control = component.notificationForm.get('pushNotifications');
      expect(control?.value).toBe(false);
    });

    it('should initialize smsNotifications as false', () => {
      const control = component.notificationForm.get('smsNotifications');
      expect(control?.value).toBe(false);
    });

    it('should initialize marketingEmails as false', () => {
      const control = component.notificationForm.get('marketingEmails');
      expect(control?.value).toBe(false);
    });

    it('should initialize securityAlerts as true', () => {
      const control = component.notificationForm.get('securityAlerts');
      expect(control?.value).toBe(true);
    });

    it('should initialize productUpdates as true', () => {
      const control = component.notificationForm.get('productUpdates');
      expect(control?.value).toBe(true);
    });

    it('should initialize darkMode as false', () => {
      const control = component.notificationForm.get('darkMode');
      expect(control?.value).toBe(false);
    });

    it('should initialize soundEffects as true', () => {
      const control = component.notificationForm.get('soundEffects');
      expect(control?.value).toBe(true);
    });

    it('should have valid form initially', () => {
      expect(component.notificationForm.valid).toBe(true);
    });
  });

  describe('enableNotifications valueChanges Subscription', () => {
    it('should disable all notifications when enableNotifications is set to false', () => {
      component.notificationForm.patchValue({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: true,
        marketingEmails: true,
        securityAlerts: true,
        productUpdates: true
      });

      component.notificationForm.get('enableNotifications')?.setValue(false);

      expect(component.notificationForm.get('emailNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('pushNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('smsNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('marketingEmails')?.value).toBe(false);
      expect(component.notificationForm.get('securityAlerts')?.value).toBe(false);
      expect(component.notificationForm.get('productUpdates')?.value).toBe(false);
    });

    it('should not affect darkMode and soundEffects when disabling notifications', () => {
      component.notificationForm.patchValue({
        darkMode: true,
        soundEffects: true
      });

      component.notificationForm.get('enableNotifications')?.setValue(false);

      expect(component.notificationForm.get('darkMode')?.value).toBe(true);
      expect(component.notificationForm.get('soundEffects')?.value).toBe(true);
    });

    it('should not change values when enableNotifications is set to true', () => {
      component.notificationForm.patchValue({
        emailNotifications: false,
        pushNotifications: false
      });

      component.notificationForm.get('enableNotifications')?.setValue(true);

      expect(component.notificationForm.get('emailNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('pushNotifications')?.value).toBe(false);
    });
  });

  describe('onSubmit Method', () => {
    it('should log notification settings when form is valid', () => {
      spyOn(console, 'log');
      
      component.onSubmit();
      
      expect(console.log).toHaveBeenCalledWith('Notification Settings:', component.notificationForm.value);
    });

    it('should set savedMessage when form is submitted', () => {
      component.onSubmit();
      
      expect(component.savedMessage).toBe('✅ Configurações salvas com sucesso!');
    });

    it('should clear savedMessage after 3 seconds', fakeAsync(() => {
      component.onSubmit();
      expect(component.savedMessage).toBe('✅ Configurações salvas com sucesso!');
      
      tick(3000);
      expect(component.savedMessage).toBe('');
    }));

    it('should not clear savedMessage before 3 seconds', fakeAsync(() => {
      component.onSubmit();
      expect(component.savedMessage).toBe('✅ Configurações salvas com sucesso!');
      
      tick(2999);
      expect(component.savedMessage).toBe('✅ Configurações salvas com sucesso!');
      
      tick(1);
      expect(component.savedMessage).toBe('');
    }));

    it('should submit with custom form values', () => {
      spyOn(console, 'log');
      component.notificationForm.patchValue({
        enableNotifications: false,
        emailNotifications: false,
        darkMode: true
      });
      
      component.onSubmit();
      
      expect(console.log).toHaveBeenCalledWith('Notification Settings:', jasmine.objectContaining({
        enableNotifications: false,
        emailNotifications: false,
        darkMode: true
      }));
    });
  });

  describe('resetForm Method', () => {
    it('should reset enableNotifications to true', () => {
      component.notificationForm.patchValue({ enableNotifications: false });
      
      component.resetForm();
      
      expect(component.notificationForm.get('enableNotifications')?.value).toBe(true);
    });

    it('should reset emailNotifications to true', () => {
      component.notificationForm.patchValue({ emailNotifications: false });
      
      component.resetForm();
      
      expect(component.notificationForm.get('emailNotifications')?.value).toBe(true);
    });

    it('should reset pushNotifications to false', () => {
      component.notificationForm.patchValue({ pushNotifications: true });
      
      component.resetForm();
      
      expect(component.notificationForm.get('pushNotifications')?.value).toBe(false);
    });

    it('should reset smsNotifications to false', () => {
      component.notificationForm.patchValue({ smsNotifications: true });
      
      component.resetForm();
      
      expect(component.notificationForm.get('smsNotifications')?.value).toBe(false);
    });

    it('should reset marketingEmails to false', () => {
      component.notificationForm.patchValue({ marketingEmails: true });
      
      component.resetForm();
      
      expect(component.notificationForm.get('marketingEmails')?.value).toBe(false);
    });

    it('should reset securityAlerts to true', () => {
      component.notificationForm.patchValue({ securityAlerts: false });
      
      component.resetForm();
      
      expect(component.notificationForm.get('securityAlerts')?.value).toBe(true);
    });

    it('should reset productUpdates to true', () => {
      component.notificationForm.patchValue({ productUpdates: false });
      
      component.resetForm();
      
      expect(component.notificationForm.get('productUpdates')?.value).toBe(true);
    });

    it('should reset darkMode to false', () => {
      component.notificationForm.patchValue({ darkMode: true });
      
      component.resetForm();
      
      expect(component.notificationForm.get('darkMode')?.value).toBe(false);
    });

    it('should reset soundEffects to true', () => {
      component.notificationForm.patchValue({ soundEffects: false });
      
      component.resetForm();
      
      expect(component.notificationForm.get('soundEffects')?.value).toBe(true);
    });

    it('should clear savedMessage', () => {
      component.savedMessage = '✅ Configurações salvas com sucesso!';
      
      component.resetForm();
      
      expect(component.savedMessage).toBe('');
    });

    it('should reset all fields at once', () => {
      component.notificationForm.patchValue({
        enableNotifications: false,
        emailNotifications: false,
        pushNotifications: true,
        smsNotifications: true,
        marketingEmails: true,
        securityAlerts: false,
        productUpdates: false,
        darkMode: true,
        soundEffects: false
      });
      
      component.resetForm();
      
      expect(component.notificationForm.value).toEqual({
        enableNotifications: true,
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
        marketingEmails: false,
        securityAlerts: true,
        productUpdates: true,
        darkMode: false,
        soundEffects: true
      });
    });
  });

  describe('toggleAll Method', () => {
    it('should enable all notification fields when called with true', () => {
      component.notificationForm.patchValue({
        enableNotifications: false,
        emailNotifications: false,
        pushNotifications: false,
        smsNotifications: false,
        marketingEmails: false,
        securityAlerts: false,
        productUpdates: false
      });

      component.toggleAll(true);

      expect(component.notificationForm.get('enableNotifications')?.value).toBe(true);
      expect(component.notificationForm.get('emailNotifications')?.value).toBe(true);
      expect(component.notificationForm.get('pushNotifications')?.value).toBe(true);
      expect(component.notificationForm.get('smsNotifications')?.value).toBe(true);
      expect(component.notificationForm.get('marketingEmails')?.value).toBe(true);
      expect(component.notificationForm.get('securityAlerts')?.value).toBe(true);
      expect(component.notificationForm.get('productUpdates')?.value).toBe(true);
    });

    it('should disable all notification fields when called with false', () => {
      component.toggleAll(false);

      expect(component.notificationForm.get('enableNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('emailNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('pushNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('smsNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('marketingEmails')?.value).toBe(false);
      expect(component.notificationForm.get('securityAlerts')?.value).toBe(false);
      expect(component.notificationForm.get('productUpdates')?.value).toBe(false);
    });

    it('should not affect darkMode and soundEffects', () => {
      component.notificationForm.patchValue({
        darkMode: true,
        soundEffects: false
      });

      component.toggleAll(true);

      expect(component.notificationForm.get('darkMode')?.value).toBe(true);
      expect(component.notificationForm.get('soundEffects')?.value).toBe(false);
    });
  });

  describe('notificationsEnabled Getter', () => {
    it('should return true when enableNotifications is true', () => {
      component.notificationForm.patchValue({ enableNotifications: true });
      
      expect(component.notificationsEnabled).toBe(true);
    });

    it('should return false when enableNotifications is false', () => {
      component.notificationForm.patchValue({ enableNotifications: false });
      
      expect(component.notificationsEnabled).toBe(false);
    });

    it('should reflect changes in enableNotifications', () => {
      component.notificationForm.patchValue({ enableNotifications: true });
      expect(component.notificationsEnabled).toBe(true);
      
      component.notificationForm.patchValue({ enableNotifications: false });
      expect(component.notificationsEnabled).toBe(false);
    });
  });

  describe('activeNotificationsCount Getter', () => {
    it('should count initial active notifications', () => {
      // Initial: enableNotifications, emailNotifications, securityAlerts, productUpdates = 4
      expect(component.activeNotificationsCount).toBe(4);
    });

    it('should not count darkMode', () => {
      component.notificationForm.patchValue({ darkMode: true });
      
      // Should still be 4 (darkMode is excluded)
      expect(component.activeNotificationsCount).toBe(4);
    });

    it('should not count soundEffects', () => {
      component.notificationForm.patchValue({ soundEffects: false });
      
      // Should still be 4 (soundEffects is excluded)
      expect(component.activeNotificationsCount).toBe(4);
    });

    it('should return 0 when all notifications are disabled', () => {
      component.toggleAll(false);
      
      expect(component.activeNotificationsCount).toBe(0);
    });

    it('should return 7 when all notifications are enabled', () => {
      component.toggleAll(true);
      
      expect(component.activeNotificationsCount).toBe(7);
    });

    it('should count only enabled notification fields', () => {
      component.notificationForm.patchValue({
        enableNotifications: true,
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
        marketingEmails: false,
        securityAlerts: false,
        productUpdates: false,
        darkMode: true,
        soundEffects: true
      });
      
      expect(component.activeNotificationsCount).toBe(2);
    });

    it('should update count dynamically', () => {
      component.toggleAll(false);
      expect(component.activeNotificationsCount).toBe(0);
      
      component.notificationForm.patchValue({ enableNotifications: true });
      expect(component.activeNotificationsCount).toBe(1);
      
      component.notificationForm.patchValue({ emailNotifications: true });
      expect(component.activeNotificationsCount).toBe(2);
    });
  });

  describe('Template Rendering', () => {
    it('should render form title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.settings-title');
      expect(title?.textContent).toContain('Configurações de Notificações');
    });

    it('should render form subtitle', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const subtitle = compiled.querySelector('.settings-subtitle');
      expect(subtitle?.textContent).toContain('Gerencie como você deseja receber notificações');
    });

    it('should not display savedMessage initially', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const message = compiled.querySelector('.success-message');
      expect(message).toBeFalsy();
    });

    it('should display savedMessage when set', () => {
      component.savedMessage = '✅ Configurações salvas com sucesso!';
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const message = compiled.querySelector('.success-message');
      expect(message?.textContent).toContain('✅ Configurações salvas com sucesso!');
    });

    it('should render all nine ui-switch components', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const switches = compiled.querySelectorAll('ui-switch');
      expect(switches.length).toBe(9);
    });

    it('should display active notifications count', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.badge');
      expect(badge?.textContent).toContain('4 ativas');
    });

    it('should update badge when notifications change', () => {
      component.toggleAll(true);
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.badge');
      expect(badge?.textContent).toContain('7 ativas');
    });

    it('should render all four action buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.form-actions button');
      expect(buttons.length).toBe(4);
    });

    it('should add disabled class to sections when notifications disabled', () => {
      component.notificationForm.patchValue({ enableNotifications: false });
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const disabledSections = compiled.querySelectorAll('.section-disabled');
      expect(disabledSections.length).toBe(2);
    });

    it('should not add disabled class when notifications enabled', () => {
      component.notificationForm.patchValue({ enableNotifications: true });
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const disabledSections = compiled.querySelectorAll('.section-disabled');
      expect(disabledSections.length).toBe(0);
    });

    it('should call toggleAll(false) when disable all button is clicked', () => {
      spyOn(component, 'toggleAll');
      
      const compiled = fixture.nativeElement as HTMLElement;
      const disableButton = Array.from(compiled.querySelectorAll('.btn--secondary'))
        .find(btn => btn.textContent?.includes('Desabilitar Tudo')) as HTMLElement;
      
      disableButton.click();
      
      expect(component.toggleAll).toHaveBeenCalledWith(false);
    });

    it('should call toggleAll(true) when enable all button is clicked', () => {
      spyOn(component, 'toggleAll');
      
      const compiled = fixture.nativeElement as HTMLElement;
      const enableButton = Array.from(compiled.querySelectorAll('.btn--secondary'))
        .find(btn => btn.textContent?.includes('Habilitar Tudo')) as HTMLElement;
      
      enableButton.click();
      
      expect(component.toggleAll).toHaveBeenCalledWith(true);
    });

    it('should call resetForm when reset button is clicked', () => {
      spyOn(component, 'resetForm');
      
      const compiled = fixture.nativeElement as HTMLElement;
      const resetButton = Array.from(compiled.querySelectorAll('.btn'))
        .find(btn => btn.textContent?.includes('Restaurar Padrão')) as HTMLElement;
      
      resetButton.click();
      
      expect(component.resetForm).toHaveBeenCalled();
    });

    it('should call onSubmit when form is submitted', () => {
      spyOn(component, 'onSubmit');
      
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
    it('should complete full notification workflow', fakeAsync(() => {
      // Initial state
      expect(component.activeNotificationsCount).toBe(4);
      
      // Enable all
      component.toggleAll(true);
      expect(component.activeNotificationsCount).toBe(7);
      
      // Submit
      component.onSubmit();
      expect(component.savedMessage).toBe('✅ Configurações salvas com sucesso!');
      
      // Wait for message to clear
      tick(3000);
      expect(component.savedMessage).toBe('');
      
      // Reset to defaults
      component.resetForm();
      expect(component.activeNotificationsCount).toBe(4);
    }));

    it('should handle master switch disabling all notifications', () => {
      // Enable all first
      component.toggleAll(true);
      expect(component.activeNotificationsCount).toBe(7);
      
      // Disable master switch
      component.notificationForm.get('enableNotifications')?.setValue(false);
      
      // All notification fields should be disabled
      expect(component.notificationForm.get('emailNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('pushNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('smsNotifications')?.value).toBe(false);
      expect(component.notificationForm.get('marketingEmails')?.value).toBe(false);
      expect(component.notificationForm.get('securityAlerts')?.value).toBe(false);
      expect(component.notificationForm.get('productUpdates')?.value).toBe(false);
      
      // Count should be 0
      expect(component.activeNotificationsCount).toBe(0);
      
      // Preferences should be unaffected
      expect(component.notificationForm.get('darkMode')?.value).toBe(false);
      expect(component.notificationForm.get('soundEffects')?.value).toBe(true);
    });

    it('should handle partial notification configuration', () => {
      component.notificationForm.patchValue({
        enableNotifications: true,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        securityAlerts: true,
        productUpdates: false
      });
      
      expect(component.activeNotificationsCount).toBe(4);
      expect(component.notificationsEnabled).toBe(true);
    });
  });
});
