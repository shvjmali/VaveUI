import { TestBed } from '@angular/core/testing';

import { ShieldCodesService } from './shield-codes.service';

describe('ShieldCodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShieldCodesService = TestBed.get(ShieldCodesService);
    expect(service).toBeTruthy();
  });
});
