import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotreportEditComponent } from './spotreport-edit.component';

describe('SpotreportEditComponent', () => {
  let component: SpotreportEditComponent;
  let fixture: ComponentFixture<SpotreportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotreportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotreportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
