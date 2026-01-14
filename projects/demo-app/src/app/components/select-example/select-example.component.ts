import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  SelectOption,
  UiSelectComponent,
} from '../../../../../ui/src/public-api';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'select-example-component',
  imports: [UiSelectComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: 'select-example.component.html',
})
export class SelectExampleComponent implements OnInit {
	private fb = inject(FormBuilder);
  testForm!: FormGroup;
  statusDisabled = true;
  savedMessage = '';

  countryOptions: SelectOption[] = [
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'uk', label: 'Reino Unido' },
    { value: 'jp', label: 'Japão' },
    { value: 'de', label: 'Alemanha' },
  ];

  categoryOptions: SelectOption[] = [
    { value: 'tech', label: 'Tecnologia' },
    { value: 'finance', label: 'Finanças' },
    { value: 'health', label: 'Saúde' },
    { value: 'education', label: 'Educação' },
  ];

  statusOptions: SelectOption[] = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
    { value: 'pending', label: 'Pendente' },
  ];

  ngOnInit() {
    this.testForm = this.fb.group({
      country: ['', Validators.required],
      category: [''],
      status: [{ value: 'active', disabled: this.statusDisabled }],
    });
  }

  onSubmit(): void {
    if (this.testForm.valid) {
      console.log('Form Submitted:', this.testForm.value);
      this.savedMessage = '✅ Formulário enviado com sucesso!';
      
      setTimeout(() => {
        this.savedMessage = '';
      }, 3000);
    }
  }

  resetForm(): void {
    this.testForm.reset();
    this.savedMessage = '';
  }

  toggleStatus() {
    this.statusDisabled = !this.statusDisabled;
    if (this.statusDisabled) {
      this.testForm.get('status')?.disable();
    } else {
      this.testForm.get('status')?.enable();
    }
  }

  patchValue() {
    this.testForm.patchValue({
      country: 'br',
      category: 'tech',
      status: 'active',
    });
  }
}
