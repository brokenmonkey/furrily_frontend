/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GigpageComponent } from './gigpage.component';

describe('GigpageComponent', () => {
  let component: GigpageComponent;
  let fixture: ComponentFixture<GigpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
