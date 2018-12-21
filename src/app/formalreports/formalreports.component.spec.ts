import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalreportsComponent } from './formalreports.component';

describe('FormalreportsComponent', () => {
  let component: FormalreportsComponent;
  let fixture: ComponentFixture<FormalreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
