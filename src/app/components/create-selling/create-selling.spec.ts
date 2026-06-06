import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSelling } from './create-selling';

describe('CreateSelling', () => {
  let component: CreateSelling;
  let fixture: ComponentFixture<CreateSelling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSelling],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSelling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
