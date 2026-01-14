import { TestBed } from '@angular/core/testing';
import { SelectExampleComponent } from './select-example.component';

describe('SelectExampleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectExampleComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SelectExampleComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});