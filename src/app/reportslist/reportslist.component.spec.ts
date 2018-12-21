import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportslistComponent } from './reportslist.component';

describe('ReportslistComponent', () => {
  let component: ReportslistComponent;
  let fixture: ComponentFixture<ReportslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
