import { TestBed } from '@angular/core/testing';

import { FormalapprovalService } from './formalapproval.service';

describe('FormalapprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormalapprovalService = TestBed.get(FormalapprovalService);
    expect(service).toBeTruthy();
  });
});
