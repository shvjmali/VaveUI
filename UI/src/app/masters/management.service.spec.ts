import { TestBed } from '@angular/core/testing';

import { ManagementdService } from './managementd.service';

describe('PartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagementdService = TestBed.get(ManagementdService);
    expect(service).toBeTruthy();
  });
});
