import { Injectable } from '@angular/core';
import { DataService } from '../_core/data.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private dataService: DataService) { }

  GetSearchResult(plantCode, dateFrom, dateTo) {
    return this.dataService.getData('Report/GetSearchResult/' + plantCode + '/' + dateFrom + '/' + dateTo).map(res => {
      return res;
    });
  }
}
