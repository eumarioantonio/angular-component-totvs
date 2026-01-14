import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SelectOption } from '../../../ui/src/public-api';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the app', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.activeTab).toBe('select');
      expect(component.copied).toBe(false);
      expect(component.selectValue).toBeUndefined();
      expect(component.switchValue).toBe(false);
    });

    it('should initialize selectConfig with default values', () => {
      expect(component.selectConfig).toEqual({
        placeholder: 'Escolha uma opção',
        disabled: false,
        hasError: false
      });
    });

    it('should initialize switchConfig with default values', () => {
      expect(component.switchConfig).toEqual({
        label: 'Toggle option',
        disabled: false
      });
    });

    it('should initialize selectOptions with 3 options', () => {
      expect(component.selectOptions.length).toBe(3);
      expect(component.selectOptions).toEqual([
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3', disabled: true }
      ]);
    });
  });

  describe('Tab Navigation', () => {
    it('should switch to select tab', () => {
      component.activeTab = 'switch';
      component.switchTab('select');
      expect(component.activeTab).toBe('select');
    });

    it('should switch to switch tab', () => {
      component.activeTab = 'select';
      component.switchTab('switch');
      expect(component.activeTab).toBe('switch');
    });

    it('should remain on select tab when called again', () => {
      component.activeTab = 'select';
      component.switchTab('select');
      expect(component.activeTab).toBe('select');
    });

    it('should remain on switch tab when called again', () => {
      component.activeTab = 'switch';
      component.switchTab('switch');
      expect(component.activeTab).toBe('switch');
    });
  });

  describe('Code Example Getter', () => {
    describe('Select Tab Code Example', () => {
      beforeEach(() => {
        component.activeTab = 'select';
      });

      it('should return select code example with default config', () => {
        const code = component.codeExample;
        expect(code).toContain('<ui-select');
        expect(code).toContain('[(ngModel)]="selectedValue"');
        expect(code).toContain('[options]="options"');
        expect(code).toContain('placeholder="Escolha uma opção"');
        expect(code).toContain('(selectionChange)="onSelectionChange($event)"');
        expect(code).toContain('</ui-select>');
      }); 
    });

    describe('Switch Tab Code Example', () => {
      beforeEach(() => {
        component.activeTab = 'switch';
      });

      it('should return switch code example with default config', () => {
        const code = component.codeExample;
        expect(code).toContain('<ui-switch');
        expect(code).toContain('[(ngModel)]="switchValue"');
        expect(code).toContain('label="Toggle option"');
        expect(code).toContain('</ui-switch>');
      });

      it('should include disabled attribute when switchConfig.disabled is true', () => {
        component.switchConfig.disabled = true;
        const code = component.codeExample;
        expect(code).toContain('[disabled]="true"');
      });

      it('should not include disabled attribute when switchConfig.disabled is false', () => {
        component.switchConfig.disabled = false;
        const code = component.codeExample;
        expect(code).not.toContain('[disabled]="true"');
      });

      it('should update label in code example', () => {
        component.switchConfig.label = 'Custom label';
        const code = component.codeExample;
        expect(code).toContain('label="Custom label"');
      });
    });
  });

  describe('Event Handlers', () => {
    describe('onSelectionChange', () => {
      it('should update selectValue when option is provided', () => {
        const option: SelectOption = { value: 'option1', label: 'Option 1' };
        spyOn(console, 'log');
        
        component.onSelectionChange(option);
        
        expect(component.selectValue).toBe('option1');
        expect(console.log).toHaveBeenCalledWith('Selecionado:', option);
      });

      it('should handle option with different value', () => {
        const option: SelectOption = { value: 'option2', label: 'Option 2' };
        spyOn(console, 'log');
        
        component.onSelectionChange(option);
        
        expect(component.selectValue).toBe('option2');
        expect(console.log).toHaveBeenCalledWith('Selecionado:', option);
      });

      it('should not update selectValue when option is null', () => {
        component.selectValue = 'option1';
        spyOn(console, 'log');
        
        component.onSelectionChange(null);
        
        expect(component.selectValue).toBe('option1');
        expect(console.log).not.toHaveBeenCalled();
      });

      it('should not log when option is null', () => {
        spyOn(console, 'log');
        
        component.onSelectionChange(null);
        
        expect(console.log).not.toHaveBeenCalled();
      });
    });

    describe('onSwitchChange', () => {
      it('should update switchValue to true', () => {
        spyOn(console, 'log');
        
        component.onSwitchChange(true);
        
        expect(component.switchValue).toBe(true);
        expect(console.log).toHaveBeenCalledWith('Switch value:', true);
      });

      it('should update switchValue to false', () => {
        spyOn(console, 'log');
        
        component.onSwitchChange(false);
        
        expect(component.switchValue).toBe(false);
        expect(console.log).toHaveBeenCalledWith('Switch value:', false);
      });

      it('should handle multiple changes', () => {
        spyOn(console, 'log');
        
        component.onSwitchChange(true);
        expect(component.switchValue).toBe(true);
        
        component.onSwitchChange(false);
        expect(component.switchValue).toBe(false);
        
        expect(console.log).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('Copy Code Functionality', () => {
    it('should copy code to clipboard and set copied to true', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve())
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true
      });

      component.activeTab = 'select';
      component.copyCode();
      tick();

      expect(mockClipboard.writeText).toHaveBeenCalledWith(component.codeExample);
      expect(component.copied).toBe(true);
    }));

    it('should reset copied to false after 2 seconds', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve())
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true
      });

      component.copyCode();
      tick();
      expect(component.copied).toBe(true);

      tick(2000);
      expect(component.copied).toBe(false);
    }));

    it('should copy switch code when activeTab is switch', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve())
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true
      });

      component.activeTab = 'switch';
      const expectedCode = component.codeExample;
      
      component.copyCode();
      tick();

      expect(mockClipboard.writeText).toHaveBeenCalledWith(expectedCode);
      expect(component.copied).toBe(true);
    }));

    it('should handle clipboard writeText promise', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve())
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true
      });

      expect(component.copied).toBe(false);
      
      component.copyCode();
      expect(component.copied).toBe(false); // Still false before promise resolves
      
      tick();
      expect(component.copied).toBe(true); // True after promise resolves
      
      tick(2000);
      expect(component.copied).toBe(false); // Back to false after timeout
    }));
  });

  describe('Template Rendering', () => {
    it('should render header with title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.showcase-header__title');
      expect(title?.textContent).toContain('Apresentação da Biblioteca de Componentes');
    });

    it('should render both navigation tabs', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const tabs = compiled.querySelectorAll('.showcase-nav__tab');
      expect(tabs.length).toBe(2);
    });

    it('should activate select tab by default', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const selectTab = compiled.querySelectorAll('.showcase-nav__tab')[0];
      expect(selectTab.classList.contains('showcase-nav__tab--active')).toBe(true);
    });

    it('should switch active class when switching tabs', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const tabs = compiled.querySelectorAll('.showcase-nav__tab');
      
      component.switchTab('switch');
      fixture.detectChanges();
      
      expect(tabs[0].classList.contains('showcase-nav__tab--active')).toBe(false);
      expect(tabs[1].classList.contains('showcase-nav__tab--active')).toBe(true);
    });

    it('should display select content when activeTab is select', () => {
      component.activeTab = 'select';
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const selectContent = compiled.querySelector('ui-select');
      expect(selectContent).toBeTruthy();
    });

    it('should display switch content when activeTab is switch', () => {
      component.activeTab = 'switch';
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const switchContent = compiled.querySelector('ui-switch');
      expect(switchContent).toBeTruthy();
    });

    it('should render copy code button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const copyButton = compiled.querySelector('.code-example__copy-btn');
      expect(copyButton).toBeTruthy();
    });

    it('should display "Copiar código" by default', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const copyButton = compiled.querySelector('.code-example__copy-btn');
      expect(copyButton?.textContent?.trim()).toBe('Copiar código');
    });

    it('should display "Copiado!" when copied is true', () => {
      component.copied = true;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const copyButton = compiled.querySelector('.code-example__copy-btn');
      expect(copyButton?.textContent?.trim()).toBe('Copiado!');
    });

    it('should call switchTab when clicking navigation buttons', () => {
      spyOn(component, 'switchTab');
      
      const compiled = fixture.nativeElement as HTMLElement;
      const switchButton = compiled.querySelectorAll('.showcase-nav__tab')[1] as HTMLElement;
      
      switchButton.click();
      
      expect(component.switchTab).toHaveBeenCalledWith('switch');
    });

    it('should call copyCode when clicking copy button', () => {
      spyOn(component, 'copyCode');
      
      const compiled = fixture.nativeElement as HTMLElement;
      const copyButton = compiled.querySelector('.code-example__copy-btn') as HTMLElement;
      
      copyButton.click();
      
      expect(component.copyCode).toHaveBeenCalled();
    });
  });

  describe('Integration Tests', () => {
    it('should update code example when switching tabs', () => {
      component.activeTab = 'select';
      const selectCode = component.codeExample;
      expect(selectCode).toContain('<ui-select');
      
      component.switchTab('switch');
      const switchCode = component.codeExample;
      expect(switchCode).toContain('<ui-switch');
      expect(switchCode).not.toContain('<ui-select');
    });

    it('should reflect config changes in code example', () => {
      component.activeTab = 'select';
      component.selectConfig.placeholder = 'New placeholder';
      component.selectConfig.disabled = true;
      
      const code = component.codeExample;
      expect(code).toContain('placeholder="New placeholder"');
      expect(code).toContain('[disabled]="true"');
    });

    it('should handle complete workflow for select tab', () => {
      expect(component.activeTab).toBe('select');
      
      const option: SelectOption = { value: 'option1', label: 'Option 1' };
      component.onSelectionChange(option);
      expect(component.selectValue).toBe('option1');
      
      component.selectConfig.disabled = true;
      expect(component.codeExample).toContain('[disabled]="true"');
      
      component.switchTab('switch');
      expect(component.activeTab).toBe('switch');
      expect(component.codeExample).toContain('<ui-switch');
    });

    it('should handle complete workflow for switch tab', () => {
      component.switchTab('switch');
      expect(component.activeTab).toBe('switch');
      
      component.onSwitchChange(true);
      expect(component.switchValue).toBe(true);
      
      component.switchConfig.disabled = true;
      expect(component.codeExample).toContain('[disabled]="true"');
      
      component.switchTab('select');
      expect(component.activeTab).toBe('select');
      expect(component.codeExample).toContain('<ui-select');
    });
  });
});
