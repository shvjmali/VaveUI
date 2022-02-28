import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
//import { FormGroup } from '@angular/forms';
import { DataService } from '../../_core/data.service';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { FileDetailsModel } from '../../_shared/model/FileDetails-model';
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import { PlantCodes } from '../../_shared/model/PlantCodes-model';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ProposalMasterModel } from '../../_shared/model/ProposalMasterModel';
import { RequestModel } from '../../_shared/model/RequestModel';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; //FormControl,
import { ControlRequestModel } from '../../_shared/model/ControlRequestModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  pager: any = {};
  loading = false;
  proposalData: ProposalMasterModel = new ProposalMasterModel();
  proposalCodes: ProposalMasterModel[] = [];
  proposalCode: ProposalMasterModel = new ProposalMasterModel();
  sortdata: any = [];
  pagedItems: ProposalMasterModel[] = [];
  searchVal: string = '';
  requestModel: RequestModel = new RequestModel();
  form: FormGroup;
  controlRequestModel: ControlRequestModel = new ControlRequestModel();
  pNumber: string;

  @ViewChild('customFile') fileInput: any;

  constructor(
    private _route: Router,
    private _dashboardService: DashboardService,
    private pagerService: PagerService,
    private snotifyService: SnotifyService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      CustomerName: [null, Validators.required],
      CustomerModel: [null, Validators.required],
      Requirement: [null, Validators.required]
    });


    // this.form = new FormGroup({
    //   CustomerName: new Form(this.requestModel.CustomerName, [
    //     Validators.required
    //   ]),
    //   CustomerModel: new FormControl(this.requestModel.CustomerModel,[
    //     Validators.required
    //   ]),
    //   Requirement: new FormControl(this.requestModel.Requirement,[
    //     Validators.required
    //   ])
    // });
    // this.form = new FormGroup({
    //   CustomerName: new FormControl(this.requestModel.CustomerName, [
    //     Validators.required
    //   ]),
    //   CustomerModel: new FormControl(this.requestModel.CustomerModel,[
    //     Validators.required
    //   ]),
    //   Requirement: new FormControl(this.requestModel.Requirement,[
    //     Validators.required
    //   ])
    // });
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.loading = true;
    this.getProposalList();
    this.loading = false;
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.proposalCodes.length, page);
    this.pagedItems = this.proposalCodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getProposalList() {
    this.proposalCodes = [];
    this._dashboardService.getProposalList(0).subscribe(result => {
      this.pagedItems = [];
      if (result != null && result.length > 0) {
        result.forEach(item => {
          this.proposalCode.ProposalID = item.proposalID;
          this.proposalCode.ProposalNumber = item.proposalNumber;
          this.proposalCode.ProposalType = item.proposalType;
          this.proposalCode.TeamCode = item.teamCode;
          this.proposalCode.CreatedBy = item.createdBy;
          this.proposalCode.CreatedDate = item.createdDate;
          this.proposalCode.LastUpdatedBy = item.lastUpdatedBy;
          this.proposalCode.LastUpdatedDate = item.lastUpdatedDate;
          //this.proposalCode.PartList = item.partList
          this.proposalCode.sPartList = item.partList;
          this.proposalCode.InternalSupplierPart = item.internalSupplierPart;
          //this.proposalCode.CustomerName = "";
          //this.proposalCode.CustomerModel = "";
          this.proposalCodes.push(this.proposalCode);
          this.proposalCode = new ProposalMasterModel();
        });
        this.sortdata = this.proposalCodes;
        console.log(result);
        this.setPage(1);
      }
    });
  }

  ViewProposalDetail(item: any) {

    this._route.navigate(['/home/proposalview'], {
        queryParams: {
          proposalID: item.ProposalID,
        }
     });
   }

  checkSearchVal() {
    this.proposalCodes = [];
    console.log(this.searchVal);
    if (this.searchVal && this.searchVal != '') {      
        this.pagedItems = [];
        if (this.sortdata != null && this.sortdata.length > 0) {
          this.proposalCodes = [];
          this.sortdata.forEach(item => {
            //if(this.searchVal.length >= 6){
              if (item.ProposalNumber.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 ||
              item.sPartList.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1 || 
              item.InternalSupplierPart.toString().toLowerCase().search(this.searchVal.toString().toLowerCase()) != -1) 
              {
                  this.proposalCode.ProposalID = item.ProposalID;
                  this.proposalCode.ProposalNumber = item.ProposalNumber;
                  this.proposalCode.ProposalType = item.ProposalType;
                  this.proposalCode.TeamCode = item.TeamCode;
                  this.proposalCode.CreatedBy = item.CreatedBy;
                  this.proposalCode.CreatedDate = item.CreatedDate;
                  this.proposalCode.LastUpdatedBy = item.LastUpdatedBy;
                  this.proposalCode.LastUpdatedDate = item.LastUpdatedDate;
                  //this.proposalCode.PartList = item.partList
                  this.proposalCode.InternalSupplierPart = item.InternalSupplierPart;
                  this.proposalCode.sPartList = item.sPartList;
                  this.proposalCodes.push(this.proposalCode);
                  this.proposalCode = new ProposalMasterModel();
              }
            //}
          });
          this.setPage(1);
        }
    }
  }

  requestproposaldetail(item: any, RequestDetails){
    this.pNumber = item.ProposalNumber;
    RequestDetails.show();
  }



  RequestDetailSubmit(requestDetail, RequestDetails)
  {   
    debugger; 
    this.controlRequestModel.name = this.currentUser[0].userName;
    this.controlRequestModel.emailID = this.currentUser[0].workMail;
    this.controlRequestModel.customer = requestDetail.CustomerName;
    this.controlRequestModel.customerModel = requestDetail.CustomerModel;
    this.controlRequestModel.requirement = requestDetail.Requirement;
    this.controlRequestModel.controlNumber = this.pNumber;
    this._dashboardService.requestProposalDetails(this.controlRequestModel).subscribe(result => {
      if(result)
      {
  
      this.snotifyService.info('Request send successfully', 'Success', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        position: SnotifyPosition.centerTop,
        backdrop: 0.5
      });
      RequestDetails.hide();
    }else{
      this.loading = false;
                    this.snotifyService.info('Request send failed', 'Failed', {
                    timeout: 2000,
                    showProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position: SnotifyPosition.centerTop,
                    backdrop: 0.5
        })
      }
    })
  }
}