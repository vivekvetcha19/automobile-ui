import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingList } from './selling-list';

describe('SellingList', () => {
  let component: SellingList;
  let fixture: ComponentFixture<SellingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingList],
    }).compileComponents();

    fixture = TestBed.createComponent(SellingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
