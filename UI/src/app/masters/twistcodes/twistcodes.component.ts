import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { TwistComponent } from '../../_shared/model/twistComponent';
import { TwistCodesService } from '../twist-codes.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-twistcodes',
  templateUrl: './twistcodes.component.html'
})
export class TwistcodesComponent implements OnInit {
  loading = false;
  twistCodeData: TwistComponent = new TwistComponent();
  twistCodes: TwistComponent[] = [];
  twistCode: TwistComponent = new TwistComponent();
  pagedItems: TwistComponent[] = [];
  sortdata: any = [];
  pager: any = {};
  constructor(private pagerService: PagerService, private snotifyService: SnotifyService, private _twistCodeService: TwistCodesService) { }

  ngOnInit() {
    this.loading = true;
    this.getTwistCodeData();
    this.loading = false;
    //USERS: User[];
  }

  setPage(page: number) {
    debugger;
    this.pager = this.pagerService.getPager(this.twistCodes.length, page);
    this.pagedItems = this.twistCodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getTwistCodeData() {
    this.twistCodes = [];
    this._twistCodeService.getTwistCodes().subscribe(result => {
      this.pagedItems = [];
      if (result != null && result.length > 0) {
        result.forEach(item => {
          this.twistCode.id = item.id;
          this.twistCode.wire1 = item.wire1;
          this.twistCode.wire2 = item.wire2;
          if (item.wire3 === null || item.wire3 === '') {
            this.twistCode.wire3 = '-';
          } else {
            this.twistCode.wire3 = item.wire3;
          }
          if (item.wire4 === null || item.wire4 === '') {
            this.twistCode.wire3 = '-';
          } else {
            this.twistCode.wire4 = item.wire4;
          }
          this.twistCode.componentCode = item.componentCode;
          this.twistCodes.push(this.twistCode);
          this.twistCode = new TwistComponent();
        });
        this.sortdata = result;
        console.log(result);
        this.setPage(1);
      }
    });
  }

  searchVal: string = '';

  checkSearchVal() {
    debugger;
    this.twistCodes = [];
    console.log(this.searchVal);
    if (this.searchVal && this.searchVal != '') {      
      /* FOR EACH*/
      // this.sortdata.array.forEach(element => {
        
      // });
      //this._twistCodeService.getTwistCodes().subscribe(result => {
        this.pagedItems = [];
        if (this.sortdata != null && this.sortdata.length > 0) {
          this.sortdata.forEach(item => {
            if (item.wire1.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 ||
                item.wire2.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 ||
                item.wire3.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 ||
                item.wire4.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 ||
                item.componentCode.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1) {
                  this.twistCode.id = item.id;
                  this.twistCode.wire1 = item.wire1;
                  this.twistCode.wire2 = item.wire2;
                  if (item.wire3 === null || item.wire3 === '') {
                    this.twistCode.wire3 = '-';
                  } else {
                    this.twistCode.wire3 = item.wire3;
                  }
                  if (item.wire4 === null || item.wire4 === '') {
                    this.twistCode.wire3 = '-';
                  } else {
                    this.twistCode.wire4 = item.wire4;
                  }
                  this.twistCode.componentCode = item.componentCode;
                  this.twistCodes.push(this.twistCode);
                  this.twistCode = new TwistComponent();
                }
          });
          this.setPage(1);
        }
      //});      
    }
  }

  addTwistCode() {
    if (
      this.twistCodeData.wire1 === null ||
      this.twistCodeData.wire1 === '' ||
      this.twistCodeData.wire2 === null ||
      this.twistCodeData.wire2 === '' ||
      this.twistCodeData.componentCode === null ||
      this.twistCodeData.componentCode === ''
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
      this._twistCodeService.addTwistCode(this.twistCodeData).subscribe(result => {
        this.loading = false;
        if (result !== null && result.isCompletedSuccessfully === true) {
          this.twistCodeData = new TwistComponent();
          this.snotifyService.info('Twist code added successfully', 'Success', {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: SnotifyPosition.centerTop,
            backdrop: 0.5
          });
          this.getTwistCodeData();
        } else {
          this.loading = false;
          this.snotifyService.info('Twist code not added', 'Failed', {
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

  deleteTwistCode(id) {
    this.loading = true;
    this._twistCodeService.deleteTwistCode(id).subscribe(result => {
      if (result.isCompletedSuccessfully) {
        this.getTwistCodeData();
        this.loading = false;
        this.snotifyService.info('Twist Code Deleted Successfully', 'Delete Success', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: SnotifyPosition.centerTop,
          backdrop: 0.5
        });
      } else {
        this.loading = false;
        this.snotifyService.info('Twist Code Not Deleted', 'Delete Failed', {
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

  reset(form) {
    form.reset();
  }
}
