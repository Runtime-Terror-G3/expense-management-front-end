import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistShowCompetitorComponent } from './wishlist-show-competitor.component';

describe('WishlistShowCompetitorComponent', () => {
  let component: WishlistShowCompetitorComponent;
  let fixture: ComponentFixture<WishlistShowCompetitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistShowCompetitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistShowCompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
