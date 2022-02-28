import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { PartComponent } from '../../_shared/model/partComponent';
import { PartsService } from '../parts.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partcodes',
  templateUrl: './parts.component.html'
})
export class PartsComponent implements OnInit {
  loading = false;
  twistCodeData: PartComponent = new PartComponent();
  twistCodes: PartComponent[] = [];
  twistCode: PartComponent = new PartComponent();
  pagedItems: PartComponent[] = [];
  sortdata: any = [];
  pager: any = {};
  editObject :any;
  constructor(private pagerService: PagerService, private _route: Router, private snotifyService: SnotifyService, private _twistCodeService: PartsService) { }

  ngOnInit() {
    this.loading = true;
    this.getPartList();
    this.loading = false;
    //USERS: User[];
  }

  editPart(data: any){
    this.editObject = data;
}

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.twistCodes.length, page);
    this.pagedItems = this.twistCodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  UploadDocument(item: any) {
    this._route.navigate(['/masters-add/dupload'], {
        queryParams: {
          partNumber: item.yazakipartnumber,
        }
     });
    
     // this._route.navigate(['viewgatepass/view', item.gP_SrNO]);
   }

   ViewPartDetail(item: any) {
    this._route.navigate(['/masters-add/viewpart'], {
        queryParams: {
          partNumber: item.yazakipartnumber,
        }
     });
   }
   EditPartDetail(item: any) {
    this._route.navigate(['/masters-add/partedit'], {
        queryParams: {
          partNumber: item.yazakipartnumber,
        }
     });
   }

  getPartList() {
    this.twistCodes = [];
    this._twistCodeService.getPartList().subscribe(result => {
      this.pagedItems = [];
      if (result != null && result.length > 0) {
        result.forEach(item => {
          this.twistCode.id = item.id;
          this.twistCode.yazakipartnumber = item.yazakiPartNumber;
          this.twistCode.tpartnumber = item.internalPartNumber;
          this.twistCode.supplierpartnumber = item.supplierPartNumber;
          this.twistCode.customerpartnumber = item.customerPartNumber;
          this.twistCode.Comodity = item.comodity;
          this.twistCodes.push(this.twistCode);
          this.twistCode = new PartComponent();
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
      this._twistCodeService.getPartList().subscribe(result => {
        this.pagedItems = [];
        if (this.sortdata != null && this.sortdata.length > 0) {
          this.sortdata.forEach(item => {
            if (item.yazakiPartNumber.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 ||
                item.internalPartNumber.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 ||
                item.supplierPartNumber.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 //||
                //item.wire4.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 ||
                //item.componentCode.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1
                ) {
                  this.twistCode.id = item.id;
                  this.twistCode.yazakipartnumber = item.yazakiPartNumber;
                  this.twistCode.tpartnumber = item.internalPartNumber;
                  this.twistCode.supplierpartnumber = item.supplierPartNumber;
                  this.twistCode.customerpartnumber = item.customerPartNumber;
                  this.twistCode.Comodity = item.comodity;
                  this.twistCodes.push(this.twistCode);
                  this.twistCode = new PartComponent();
                }
          });
          this.setPage(1);
        }
      });      
    }
  }
  /*
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
          this.twistCodeData = new PartComponent();
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
  }*/

  reset(form) {
    form.reset();
  }
}