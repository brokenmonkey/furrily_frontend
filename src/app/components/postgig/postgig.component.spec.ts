/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostgigComponent } from './postgig.component';

describe('PostgigComponent', () => {
  let component: PostgigComponent;
  let fixture: ComponentFixture<PostgigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostgigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostgigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
