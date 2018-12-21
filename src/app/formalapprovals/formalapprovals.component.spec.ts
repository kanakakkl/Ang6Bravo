import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalapprovalsComponent } from './formalapprovals.component';

describe('FormalapprovalsComponent', () => {
  let component: FormalapprovalsComponent;
  let fixture: ComponentFixture<FormalapprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalapprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
