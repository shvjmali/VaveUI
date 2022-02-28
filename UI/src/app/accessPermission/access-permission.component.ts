import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessPermissionService } from './access-permission.service';
import { PlantCodes } from '../_shared/model/PlantCodes-model';
import { AccessPermission } from '../_shared/model/accessPermission-model';
import { Constants } from '../_shared/constant';
import { PagerService } from '../_core/pager.service';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-access-permission',
  templateUrl: './access-permission.component.html'
})
export class AccessPermissionComponent implements OnInit {
  userAccessPermission: AccessPermission;
  adminAccesPermission: AccessPermission;
  selectedPlant: string;
  authorizedList: AccessPermission[];
  accessPermissionList: AccessPermission[];
  plantCodes: PlantCodes[];
  constants: typeof Constants;
  failureArray: any = [];
  successArray: any = [];
  pager: any = {};
  pagedItems: any[];
  loading = false;

  constructor(private _accessPermission: AccessPermissionService, private pagerService: PagerService) {
    this.plantCodes = new Array<PlantCodes>();
    this.accessPermissionList = new Array<AccessPermission>();
    this.userAccessPermission = new AccessPermission();
    this.adminAccesPermission = new AccessPermission();
    this.constants = Constants;
    this.authorizedList = new Array<AccessPermission>();
  }
  ngOnInit(): void {
    this.GetPlantCode();
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.authorizedList.length, page);

    // get current page of items
    this.pagedItems = this.authorizedList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  GetPlantCode() {
    this.loading = true;
    this._accessPermission.PlantCodes().subscribe(res => {
      this.plantCodes = res.result;
      this.loading = false;
    });
  }
  DeActivate(model: any, index: any) {
    this.userAccessPermission = model;
    this._accessPermission.DeActivateUser(this.userAccessPermission).subscribe(res => {
      // this.authorizedList.splice(index, 1);
      this.GetAuthorizedUserByPlant();
      // this.authorizedList = res.result;
    });
  }

  Activate(model: any, index: any) {
    this.userAccessPermission = model;
    this._accessPermission.ActivateUser(this.userAccessPermission).subscribe(res => {
      // this.authorizedList.splice(index, 1);
      this.GetAuthorizedUserByPlant();
      // this.authorizedList = res.result;
    });
  }
  GetAuthorizedUserByPlant() {
    this._accessPermission.GetAuthorizedUserByPlant(this.selectedPlant).subscribe(res => {
      this.authorizedList = res.result;
      this.pagedItems = [];
      this.setPage(1);
    });
  }
  SelectedPlantCode(SelectedPlantCode) {
    this.selectedPlant = SelectedPlantCode.target.value;
    this.GetAuthorizedUserByPlant();
  }
  SetValue() { }

  GetUserDetailsUser(userIdAccess) {
    this.userAccessPermission.userName = userIdAccess;
    this._accessPermission.GetUserDetailsByID(this.userAccessPermission.userName, this.selectedPlant, 'USER').subscribe(res => {
      this.userAccessPermission.userName = res.result[0].userName;
      this.userAccessPermission.lastName = res.result[0].lastName;
      this.userAccessPermission.firstName = res.result[0].firstName;
      this.userAccessPermission.costCenterCode = res.result[0].costCenterCode;
      this.userAccessPermission.department = res.result[0].department;
      this.userAccessPermission.jobTitle = res.result[0].jobTitle;
      this.userAccessPermission.location = res.result[0].location;
      this.userAccessPermission.existsValue = res.result[0].existsValue;
      this.userAccessPermission.plantCode = this.selectedPlant;
      this.userAccessPermission.roleName = 'USER';
      if (!res.result[0].existsValue) {
        this.userAccessPermission.isSave = true;
      } else {
        this.userAccessPermission.isSave = false;
      }
    });
  }

  GetUserDetailsAdmin(userIdAccess) {
    this.adminAccesPermission.userName = userIdAccess;
    this._accessPermission.GetUserDetailsByID(this.adminAccesPermission.userName, this.selectedPlant, 'APP_ADMIN').subscribe(res => {
      this.adminAccesPermission.userName = res.result[0].userName;
      this.adminAccesPermission.lastName = res.result[0].lastName;
      this.adminAccesPermission.firstName = res.result[0].firstName;
      this.adminAccesPermission.costCenterCode = res.result[0].costCenterCode;
      this.adminAccesPermission.department = res.result[0].department;
      this.adminAccesPermission.jobTitle = res.result[0].jobTitle;
      this.adminAccesPermission.location = res.result[0].location;
      this.adminAccesPermission.existsValue = res.result[0].existsValue;
      this.adminAccesPermission.plantCode = this.selectedPlant;
      this.adminAccesPermission.roleName = 'APP_ADMIN';
      if (!res.result[0].existsValue) {
        this.adminAccesPermission.isSave = true;
      } else {
        this.adminAccesPermission.isSave = false;
      }
    });
  }

  AllowAccess() {
    if (this.userAccessPermission.firstName !== undefined) {
      if (this.userAccessPermission.isSave) {
        this.accessPermissionList.push(this.userAccessPermission);
        this.successArray.push(this.userAccessPermission.userId);
      } else {
        this.failureArray.push(this.userAccessPermission.userId);
      }
    }
    if (this.adminAccesPermission.firstName !== undefined) {
      if (this.adminAccesPermission.isSave) {
        this.accessPermissionList.push(this.adminAccesPermission);
        this.successArray.push(this.adminAccesPermission.userId);
      } else {
        this.failureArray.push(this.adminAccesPermission.userId);
      }
    }
    this._accessPermission.AllowAccess(this.accessPermissionList).subscribe(res => {
      this.accessPermissionList = [];
      this.userAccessPermission = new AccessPermission();
      this.adminAccesPermission = new AccessPermission();
      this.GetAuthorizedUserByPlant();
      // this._toastrService.success(
      //   'The access has given successfully.',
      //   '',
      //   this.constants.toastrConfig
      // );
    });
  }
}
