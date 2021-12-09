import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTimeComponent } from './statistics-time.component';

describe('StatisticsTimeComponent', () => {
  let component: StatisticsTimeComponent;
  let fixture: ComponentFixture<StatisticsTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
