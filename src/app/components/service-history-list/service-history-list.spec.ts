import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHistoryList } from './service-history-list';

describe('ServiceHistoryList', () => {
  let component: ServiceHistoryList;
  let fixture: ComponentFixture<ServiceHistoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceHistoryList],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceHistoryList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
