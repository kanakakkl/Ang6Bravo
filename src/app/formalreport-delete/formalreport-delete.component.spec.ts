import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalreportDeleteComponent } from './formalreport-delete.component';

describe('FormalreportDeleteComponent', () => {
  let component: FormalreportDeleteComponent;
  let fixture: ComponentFixture<FormalreportDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalreportDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalreportDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
