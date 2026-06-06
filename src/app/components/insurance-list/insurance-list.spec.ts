import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceList } from './insurance-list';

describe('InsuranceList', () => {
  let component: InsuranceList;
  let fixture: ComponentFixture<InsuranceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceList],
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
