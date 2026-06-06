import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceHistory } from './create-service-history';

describe('CreateServiceHistory', () => {
  let component: CreateServiceHistory;
  let fixture: ComponentFixture<CreateServiceHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServiceHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateServiceHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
