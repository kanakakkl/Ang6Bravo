import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotreportsComponent } from './spotreports.component';

describe('SpotreportsComponent', () => {
  let component: SpotreportsComponent;
  let fixture: ComponentFixture<SpotreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
