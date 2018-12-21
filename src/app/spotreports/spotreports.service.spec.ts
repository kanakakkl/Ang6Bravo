import { TestBed } from '@angular/core/testing';

import { SpotreportsService } from './spotreports.service';

describe('SpotreportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotreportsService = TestBed.get(SpotreportsService);
    expect(service).toBeTruthy();
  });
});
