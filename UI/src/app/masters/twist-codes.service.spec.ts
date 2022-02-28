import { TestBed } from '@angular/core/testing';

import { TwistCodesService } from './twist-codes.service';

describe('TwistCodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwistCodesService = TestBed.get(TwistCodesService);
    expect(service).toBeTruthy();
  });
});
