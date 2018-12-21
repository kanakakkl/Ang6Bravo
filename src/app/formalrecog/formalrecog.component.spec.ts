import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalrecogComponent } from './formalrecog.component';

describe('FormalrecogComponent', () => {
  let component: FormalrecogComponent;
  let fixture: ComponentFixture<FormalrecogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalrecogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalrecogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
