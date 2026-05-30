import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelList } from './car-model-list';

describe('CarModelList', () => {
  let component: CarModelList;
  let fixture: ComponentFixture<CarModelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModelList],
    }).compileComponents();

    fixture = TestBed.createComponent(CarModelList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
