import { TestBed } from '@angular/core/testing';

import { ProposalApproveService } from './proposalapprove.service';

describe('ProposalApproveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProposalApproveService = TestBed.get(ProposalApproveService);
    expect(service).toBeTruthy();
  });
});
