import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalreportEditComponent } from './formalreport-edit.component';

describe('FormalreportEditComponent', () => {
  let component: FormalreportEditComponent;
  let fixture: ComponentFixture<FormalreportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalreportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalreportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
