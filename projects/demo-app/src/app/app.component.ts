import { Component } from '@angular/core';
import { SelectOption, UiSelectComponent, UiSwitchComponent } from '../../../ui/src/public-api';
import { FormsModule } from '@angular/forms';
import { SelectExampleComponent } from './components/select-example/select-example.component';
import { SwitchExampleComponent } from './components/switch-example/switch-example.component';

@Component({
  selector: 'app-root',
  imports: [UiSelectComponent, UiSwitchComponent, FormsModule, SelectExampleComponent, SwitchExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  activeTab: 'select' | 'switch' = 'select';
  copied = false;
  
  selectValue!: string;
  selectConfig = {
    placeholder: 'Escolha uma opção',
    disabled: false,
    hasError: false
  };
  
  selectOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
  ];
  
  switchValue: boolean = false;
  switchConfig = {
    label: 'Toggle option',
    disabled: false
  };

  // Tab navigation
  switchTab(tab: 'select' | 'switch'): void {
    this.activeTab = tab;
  }
  
  // Code examples
  get codeExample(): string {
    if (this.activeTab === 'select') {
      return `
        <ui-select
          [(ngModel)]="selectedValue"
          [options]="options"
          placeholder="${this.selectConfig.placeholder}"
          ${this.selectConfig.disabled ? '[disabled]="true"' : ''}
          ${this.selectConfig.hasError ? '[hasError]="true"' : ''}
          (selectionChange)="onSelectionChange($event)"
        ></ui-select>
      `;
    } else {
      return `
        <ui-switch
          [(ngModel)]="switchValue"
          label="${this.switchConfig.label}"
          ${this.switchConfig.disabled ? '[disabled]="true"' : ''}
        ></ui-switch>
      `;
    }
  }
  
  // Event handlers
  onSelectionChange(option: SelectOption | null): void {
    if (option) {
      this.selectValue = option.value;
      console.log('Selecionado:', option);
    }
  }
  
  onSwitchChange(value: boolean): void {
    this.switchValue = value;
    console.log('Switch value:', value);
  }
  
  copyCode(): void {
    navigator.clipboard.writeText(this.codeExample).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }
}
