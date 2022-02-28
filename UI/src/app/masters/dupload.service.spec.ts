import { TestBed } from '@angular/core/testing';

import { DUploadService } from './dupload.service';

describe('DUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DUploadService = TestBed.get(DUploadService);
    expect(service).toBeTruthy();
  });
});
