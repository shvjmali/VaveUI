import { Injectable, OnInit } from '@angular/core';
import { DataService } from '../_core/data.service';
import { PartComponent } from '../_shared/model/partComponent';

@Injectable({
  providedIn: 'root'
})
export class PartsService implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit() { }

  getPartList() {
    return this.dataService.getData('Master/GetPartList').map(response => {
      return response;
    });
  }

  addTwistCode(twistCode: PartComponent) {
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
