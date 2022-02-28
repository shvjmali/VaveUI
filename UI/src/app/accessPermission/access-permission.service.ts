import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DataService } from '../_core/data.service';

@Injectable()
export class AccessPermissionService {
  constructor(private _dataService: DataService) {}

  GetRoles() {
    return this._dataService
    .getData(
      'Access/GetRoles'
    )
    .map(res => {
      return res;
    });
  }

  GetUserDetailsByID(userId, plantCode, userRole) {
    return this._dataService.getData(
      'Access/GetUserDetails/' + userId + '/' + plantCode + '/' + userRole
    ).map(res => {
      return res;
    });
  }

  GetReportingManager(userId, plantCode) {
    return this._dataService.getData(
      'Access/GetReportingManager/' + userId + '/' + plantCode + '/' + 'HOD'
    ).map(res => {
      return res;
    });
  }

  AllowAccess(accesspermission) {
    return this._dataService.postElement(
      'Access/AllowAccess', accesspermission
    ).map(res => {
      return res;
    });
  }

  getDashboardDataByLocation(locId) {
    return this._dataService
      .getElementThroughId('Access/GetPartCodeDetailsByPlant/', locId)
      .map(res => {
        return res;
      });
  }

  GetPlantWiseDetails(selectedValue) {
    return this._dataService.getElementThroughId(
      'Access/GetPlantWiseDetails', selectedValue
    ).map(res => {
      return res;
    });
  }

  PlantCodes() {
    return this._dataService.getData(
      'Access/GetPlantCodes'
    ).map(res => {
      return res;
    });
  }
  GetAuthorizedUserByPlant(PlantCode) {
    return this._dataService.getElementThroughId(
      'Access/GetAuthorizedUserByPlant', PlantCode
    ).map(res => {
      return res;
    });
  }
  DeActivateUser(accessPermission) {
    return this._dataService.postElement(
      'Access/DeActivateAuthentication', accessPermission
    ).map(res => {
      return res;
    });
  }
  ActivateUser(accessPermission) {
    return this._dataService.postElement(
      'Access/ActivateAuthentication', accessPermission
    ).map(res => {
      return res;
    });
  }
}
