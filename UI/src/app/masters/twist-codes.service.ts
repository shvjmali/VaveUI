import { Injectable, OnInit } from '@angular/core';
import { DataService } from '../_core/data.service';
import { TwistComponent } from '../_shared/model/twistComponent';

@Injectable({
  providedIn: 'root'
})
export class TwistCodesService implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit() { }

  getTwistCodes() {
    return this.dataService.getData('Master/GetTwistCodes').map(response => {
      return response;
    });
  }

  addTwistCode(twistCode: TwistComponent) {
    return this.dataService.postElement('Master/AddTwistCode', twistCode).map(response => {
      return response;
    });
  }

  deleteTwistCode(id) {
    return this.dataService.postElement('Master/DeleteTwistCode', id).map(response => {
      return response;
    });
  }
}
