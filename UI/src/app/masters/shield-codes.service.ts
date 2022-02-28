import { Injectable, OnInit } from '@angular/core';
import { DataService } from '../_core/data.service';
import { ShieldComponent } from '../_shared/model/shieldComponent';

@Injectable({
  providedIn: 'root'
})
export class ShieldCodesService implements OnInit {
  constructor(private dataService: DataService) { }
  ngOnInit() { }

  getShieldCodes() {
    return this.dataService.getData('Master/GetShieldCodes').map(response => {
      return response;
    });
  }

  addShieldCode(shieldCode: ShieldComponent) {
    return this.dataService.postElement('Master/AddShieldCode/', shieldCode).map(response => {
      return response;
    });
  }

  deleteShieldCode(id) {
    return this.dataService.postElement('Master/DeleteShieldCode', id).map(response => {
      return response;
    });
  }
}
