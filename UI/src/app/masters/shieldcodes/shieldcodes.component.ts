import { Component, OnInit } from '@angular/core';
import { ShieldComponent } from '../../_shared/model/shieldComponent';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ShieldCodesService } from '../shield-codes.service';

@Component({
  selector: 'app-shieldcodes',
  templateUrl: './shieldcodes.component.html'
})
export class ShieldcodesComponent implements OnInit {
  loading = false;
  shieldCodeData: ShieldComponent = new ShieldComponent();
  shieldCodes: ShieldComponent[] = [];
  shieldCode: ShieldComponent = new ShieldComponent();
  pagedItems: ShieldComponent[] = [];
  pager: any = {};
  constructor(
    private pagerService: PagerService,
    private snotifyService: SnotifyService,
    private _shieldCodesService: ShieldCodesService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getShieldCodeData();
    this.loading = false;
  }

  addShieldCode() {
    if (
      this.shieldCodeData.material === null ||
      this.shieldCodeData.material === '' ||
      this.shieldCodeData.wireSpec === null ||
      this.shieldCodeData.wireSpec === '' ||
      this.shieldCodeData.color === null ||
      this.shieldCodeData.color === '' ||
      this.shieldCodeData.componentCode === null ||
      this.shieldCodeData.componentCode === ''
    ) {
      this.snotifyService.info('All fileds are mandatory', 'Filed Data', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        position: SnotifyPosition.centerTop,
        backdrop: 0.5
      });
    } else {
      this.loading = true;
      this._shieldCodesService.addShieldCode(this.shieldCodeData).subscribe(result => {
        this.loading = false;
        if (result !== null && result.isCompletedSuccessfully === true) {
          this.shieldCodeData = new ShieldComponent();
          this.snotifyService.info('Shield code added successfully', 'Success', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: SnotifyPosition.centerTop,
            backdrop: 0.5
          });
          this.getShieldCodeData();
        } else {
          this.loading = false;
          this.snotifyService.info('Shield code not added', 'Failed', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: SnotifyPosition.centerTop,
            backdrop: 0.5
          });
        }
      });
    }
  }

  reset(form) {
    form.reset();
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.shieldCodes.length, page);
    this.pagedItems = this.shieldCodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getShieldCodeData() {
    this.shieldCodes = [];
    this._shieldCodesService.getShieldCodes().subscribe(result => {
      this.pagedItems = [];
      if (result != null && result.length > 0) {
        result.forEach(item => {
          this.shieldCode.id = item.id;
          this.shieldCode.material = item.material;
          this.shieldCode.wireSpec = item.wireSpec;
          this.shieldCode.color = item.color;
          this.shieldCode.componentCode = item.componentCode;
          this.shieldCodes.push(this.shieldCode);
          this.shieldCode = new ShieldComponent();
        });
        console.log(result);
        this.setPage(1);
      }
    });
  }

  deleteShieldCode(id) {
    this.loading = true;
    this._shieldCodesService.deleteShieldCode(id).subscribe(result => {
      if (result.isCompletedSuccessfully) {
        this.getShieldCodeData();
        this.loading = false;
        this.snotifyService.info('Shield Code Deleted Successfully', 'Delete Success', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: SnotifyPosition.centerTop,
          backdrop: 0.5
        });
      } else {
        this.loading = false;
        this.snotifyService.info('Shield Code Not Deleted', 'Delete Failed', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: SnotifyPosition.centerTop,
          backdrop: 0.5
        });
      }
    });
  }
}
