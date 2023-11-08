import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartModalComponent } from './cart-modal.component';

describe('CartModalComponent', () => {
  let component: ShoppingCartModalComponent;
  let fixture: ComponentFixture<ShoppingCartModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartModalComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
