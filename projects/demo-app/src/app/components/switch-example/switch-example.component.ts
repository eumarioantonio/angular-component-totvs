import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchComponent } from '../../../../../ui/src/public-api';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'switch-example-component',
  standalone: true,
  imports: [UiSwitchComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './switch-example.component.html',
  styleUrl: './switch-example.component.scss'
})
export class SwitchExampleComponent implements OnInit {
  private fb = inject(FormBuilder);
  notificationForm!: FormGroup;
  savedMessage = '';

  ngOnInit() {
    this.notificationForm = this.fb.group({
      enableNotifications: [true],
      emailNotifications: [true],
      pushNotifications: [false],
      smsNotifications: [false],
      marketingEmails: [false],
      securityAlerts: [true],
      productUpdates: [true],
      darkMode: [false],
      soundEffects: [true]
    });

    this.notificationForm.get('enableNotifications')?.valueChanges.subscribe(enabled => {
      if (!enabled) {
        this.notificationForm.patchValue({
          emailNotifications: false,
          pushNotifications: false,
          smsNotifications: false,
          marketingEmails: false,
          securityAlerts: false,
          productUpdates: false
        });
      }
    });
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      console.log('Notification Settings:', this.notificationForm.value);
      this.savedMessage = '✅ Configurações salvas com sucesso!';
      
      setTimeout(() => {
        this.savedMessage = '';
      }, 3000);
    }
  }

  resetForm(): void {
    this.notificationForm.reset({
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
    this.savedMessage = '';
  }

  toggleAll(enable: boolean): void {
    this.notificationForm.patchValue({
      enableNotifications: enable,
      emailNotifications: enable,
      pushNotifications: enable,
      smsNotifications: enable,
      marketingEmails: enable,
      securityAlerts: enable,
      productUpdates: enable
    });
  }

  get notificationsEnabled(): boolean {
    return this.notificationForm.get('enableNotifications')?.value;
  }

  get activeNotificationsCount(): number {
    const values = this.notificationForm.value;
    return Object.keys(values).filter(key => 
      key !== 'darkMode' && 
      key !== 'soundEffects' && 
      values[key] === true
    ).length;
  }
}
