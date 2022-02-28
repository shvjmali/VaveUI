import { TestBed } from '@angular/core/testing';

import { ProposalViewService } from './proposalview.service';

describe('ProposalViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProposalViewService = TestBed.get(ProposalViewService);
    expect(service).toBeTruthy();
  });
});
