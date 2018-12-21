import { TestBed } from '@angular/core/testing';

import { SpotrecogService } from './spotrecog.service';

describe('SpotrecogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotrecogService = TestBed.get(SpotrecogService);
    expect(service).toBeTruthy();
  });
});
