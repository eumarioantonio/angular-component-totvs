import { Component } from '@angular/core';
import { SelectOption, UiSelectComponent } from '../../../ui/src/public-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [UiSelectComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo-app';
  selectedValue!: string;
  copied = false;
  
  playgroundConfig = {
    placeholder: 'Escolha uma opção',
    disabled: false,
    hasError: false
  };
  
  options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
  ];
  
  get codeExample(): string {
    return `
      <ui-select
        [(ngModel)]="selectedValue"
        [options]="options"
        placeholder="${this.playgroundConfig.placeholder}"
        ${this.playgroundConfig.disabled ? '[disabled]="true"' : ''}
        ${this.playgroundConfig.hasError ? '[hasError]="true"' : ''}
        (selectionChange)="onSelectionChange($event)"
      ></ui-select>
    `;
  }
  
  onSelectionChange(option: SelectOption | null) {
    if (option) {
      this.selectedValue = option.value;
      console.log('Selecionado:', option);
    }
  }
  
  copyCode() {
    navigator.clipboard.writeText(this.codeExample).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }
}
