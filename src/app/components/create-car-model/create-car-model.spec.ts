import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarModel } from './create-car-model';

describe('CreateCarModel', () => {
  let component: CreateCarModel;
  let fixture: ComponentFixture<CreateCarModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCarModel],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCarModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
