import { TestBed } from '@angular/core/testing';
import { ViewPartService } from './ViewPart.Service';

describe('ViewPartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewPartService = TestBed.get(ViewPartService);
    expect(service).toBeTruthy();
  });
});
