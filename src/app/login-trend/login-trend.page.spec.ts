import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTrendPage } from './login-trend.page';

describe('LoginTrendPage', () => {
  let component: LoginTrendPage;
  let fixture: ComponentFixture<LoginTrendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTrendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTrendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
