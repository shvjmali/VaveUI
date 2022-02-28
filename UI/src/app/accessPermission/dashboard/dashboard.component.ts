import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { PlantCodes } from '../../_shared/model/PlantCodes-model';
import { DisplayList } from '../../_shared/model/DisplayList-model';
import { AccessPermissionService } from '../access-permission.service';
import { PagerService } from '../../_core/pager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  selectedPlant: string;
  pagedItems: any = [];
  plantCodes: PlantCodes[];
  pager: any = {};
  public loading = false;
  data: any = [];
  sortData: any = [];
  currentUser: any;
  statusArray: any;
  reportList: DisplayList[];
  constructor(
    private _route: Router,
    private pagerService: PagerService,
    private _accessPermission: AccessPermissionService
  ) {
    this.reportList = new Array<DisplayList>();
  }

  ngOnInit() {
    this.GetPlantCode();
  }
  getCurrentUserDetails() {}
  SortByStatus(status) {}

  GetPlantCode() {
    this._accessPermission.PlantCodes().subscribe(res => {
      this.plantCodes = res.result;
    });
  }

  SelectedPlantCode(selectedPlant) {
    this.data = [];
    this.pagedItems = [];
    this._accessPermission
      .getDashboardDataByLocation(selectedPlant.target.value)
      .subscribe(res => {
        res.forEach(item => {
          if (item.type) {
            item.type = 'YOS';
          } else {
            item.type = 'NonYOS';
          }
        });
        this.reportList = res;
        this.setPage(1);
      });
  }

  setPage(page: number) {
    this.loading = true;
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.reportList.length, page, 20);
    this.pagedItems = this.reportList.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    // this.show = true;
    this.loading = false;
  }
  ViewPartRequest(item: any) {
    this._route.navigate(['view-request/view', item.requestNumber]);
  }
}
