import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotreportDeleteComponent } from './spotreport-delete.component';

describe('SpotreportDeleteComponent', () => {
  let component: SpotreportDeleteComponent;
  let fixture: ComponentFixture<SpotreportDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotreportDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotreportDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
