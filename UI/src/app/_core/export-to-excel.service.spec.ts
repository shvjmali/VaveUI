import { TestBed, inject } from '@angular/core/testing';

import { ExportToExcelService } from './export-to-excel.service';

describe('ExportToExcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportToExcelService]
    });
  });

  it('should ...', inject([ExportToExcelService], (service: ExportToExcelService) => {
    expect(service).toBeTruthy();
  }));
});
