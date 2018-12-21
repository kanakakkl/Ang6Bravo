import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotrecogComponent } from './spotrecog.component';

describe('SpotrecogComponent', () => {
  let component: SpotrecogComponent;
  let fixture: ComponentFixture<SpotrecogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotrecogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotrecogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
