import { Injectable, OnInit } from '@angular/core';
import { DataService } from '../_core/data.service';
import { ManagementModel } from '../_shared/model/ManagementModel';

@Injectable({
  providedIn: 'root'
})
export class ManagementdService implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit() { }

  getManagementData() {
    return this.dataService.getData('Report/GetManagementDashboard').map(response => {
      return response;
    });
  }
}
