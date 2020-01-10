import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackActivationPage } from './pack-activation.page';

describe('PackActivationPage', () => {
  let component: PackActivationPage;
  let fixture: ComponentFixture<PackActivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackActivationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
