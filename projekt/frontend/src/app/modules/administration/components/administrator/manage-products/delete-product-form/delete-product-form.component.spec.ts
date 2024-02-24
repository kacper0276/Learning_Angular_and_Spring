import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductFormComponent } from './delete-product-form.component';

describe('DeleteProductFormComponent', () => {
  let component: DeleteProductFormComponent;
  let fixture: ComponentFixture<DeleteProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
