import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MauProgressionPage } from './mau-progression.page';

describe('MauProgressionPage', () => {
  let component: MauProgressionPage;
  let fixture: ComponentFixture<MauProgressionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MauProgressionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MauProgressionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
