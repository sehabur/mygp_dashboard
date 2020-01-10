import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueTrendPage } from './revenue-trend.page';

describe('RevenueTrendPage', () => {
  let component: RevenueTrendPage;
  let fixture: ComponentFixture<RevenueTrendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueTrendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueTrendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
