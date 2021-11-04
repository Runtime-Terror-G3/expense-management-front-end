import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { By } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ SignInComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an email field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#emailField')).toBeTruthy();
  });

  it('should have a password field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#passwordField')).toBeTruthy();
  });

  it('should have a submit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Sign in');
  });

  it('should reset after submit button click', () => {
    let emailField = fixture.debugElement.query(By.css('#emailField')).nativeElement;
    emailField.value = 'test';
    fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
    expect(emailField.value).toBe('');
  })
});
