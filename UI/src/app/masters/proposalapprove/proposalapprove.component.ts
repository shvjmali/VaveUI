import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ProposalApproveService } from '../proposalapprove.service';
//import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ProposalMasterModel } from '../../_shared/model/ProposalMasterModel';
//import { ModalModule } from "ngx-bootstrap";
//import { ToastrService } from 'toastr-ng2';
import { Approver } from '../../_shared/model/approver-model';
//import { PartComponent } from '../../_shared/model/partComponent';
//import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; //FormControl,
import { ProposalService } from '../proposal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposalapprove',
  templateUrl: './proposalapprove.component.html'
})
export class ProposalApproveComponent implements OnInit {
    loading = false;
    constants: any;  
    searchVal: string = '';
    currentUser: any[];  
    proposalData: ProposalMasterModel = new ProposalMasterModel();
    proposalCodes: ProposalMasterModel[] = [];
    proposalCode: ProposalMasterModel = new ProposalMasterModel();
    pagedItems: ProposalMasterModel[] = [];
    approverModel: Approver = new Approver();
    proposalDetail: any; //= new PartComponent();
    sortdata: any = [];
    pager: any = {};
    constructor(
        private pagerService: PagerService, 
        private _route: Router, 
        private snotifyService: SnotifyService, 
        private _proposalService: ProposalService,
        //private _proposalapproveService: ProposalApproveService
        )
         { }
    
    ngOnInit() {
        this.loading = true;
        this.proposalCode.Remarks = "";    
        
        this.getProposalList();
        this.currentUser = this.getCurrentUserDetails();
        this.loading = false;
        //this.approverModel = new Approver();
        //this.proposalDetail = new PartComponent();
    }

    getCurrentUserDetails() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }

    setPage(page: number) {
        this.pager = this.pagerService.getPager(this.proposalCodes.length, page);
        this.pagedItems = this.proposalCodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    getProposalList() {
      debugger;
      this.proposalCodes = [];
      this._proposalService.getProposalList(1).subscribe(result => {
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
            this.proposalCode.sPartList = item.partList;
            this.proposalCode.PartC = item.partList.split(',');
            this.proposalCode.InternalSupplierPart = item.internalSupplierPart;          
            this.proposalCodes.push(this.proposalCode);
            this.proposalCode = new ProposalMasterModel();
          });
          this.sortdata = result;
          console.log(result);
          this.setPage(1);
        }
      });
    }

    // getApprovalProposalList() {
    //   debugger;
    //   this.proposalCodes = [];
    //   this._proposalService.getAProposalList().subscribe(result => {
    //     //this._proposalapproveService.getApprovalProposalItemList().subscribe(result => {
    //     this.pagedItems = [];
    //     if (result != null && result.length > 0) {
    //       result.forEach(item => {
    //         this.proposalCode.ProposalID = item.proposalID;
    //         this.proposalCode.ProposalNumber = item.proposalNumber;
    //         this.proposalCode.ProposalType = item.proposalType;
    //         this.proposalCode.TeamCode = item.teamCode;
    //         this.proposalCode.CreatedBy = item.createdBy;
    //         this.proposalCode.CreatedDate = item.createdDate;
    //         this.proposalCode.LastUpdatedBy = item.lastUpdatedBy;
    //         this.proposalCode.LastUpdatedDate = item.lastUpdatedDate;
    //         this.proposalCode.sPartList = item.partList;
    //         this.proposalCode.PartC = item.partList.split(',');
    //         this.proposalCode.Remarks = "";
    //         // if(result.lProposalDetail != null && result.lProposalDetail.length > 0){
              
    //         // }
    //         this.proposalCodes.push(this.proposalCode);
    //         this.proposalCode = new ProposalMasterModel();
    //       });
    //       this.sortdata = result;
    //       console.log(result);
    //       this.setPage(1);
    //     }
    //   });
    // }   

    ViewProposalDetail(item: any) {
      this._route.navigate([]).then(result => {  window.open('/#/home/proposalview?proposalID=' + item.ProposalID, '_blank');
     });    
    }
  
    ViewPartDetail(item: any) {
      this._route.navigate([]).then(result => {  window.open('/#/masters-add/viewpart?partNumber=' + item, '_blank'); });    
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

    // approvedenypart(item: any, ApproverDenyDetails) {
    //   this._proposalapproveService.GetProposalItemDetail(item).subscribe(res => {
    //     this.proposalDetail = res;
    //     ApproverDenyDetails.show();
    //   });
    // }
    
    // RejectSummary(proposalCode)
    // {
    //     this.proposalDetail.action = 'Reject';
    //     this.proposalDetail.action_By = this.currentUser[0].userId;
    //     this.proposalDetail.action_On = new Date();
    //     this.proposalDetail.remarks = proposalCode.remarks;
    //     this._proposalapproveService.ApproveRejectProposalItem(this.proposalDetail).subscribe(result => {
    //     this.loading = false;
    //     if(result){
    //     this.snotifyService.info('Successfully rejected the proposal part number', 'Success', {
    //       timeout: 2000,
    //       showProgressBar: true,
    //       closeOnClick: false,
    //       pauseOnHover: true,
    //       position: SnotifyPosition.centerTop,
    //       backdrop: 0.5
    //     });
    //     this.getApprovalProposalList();
    //     //ApproverDenyDetails.hide();
    //     //this.setPage(1);
    //     }else{
    //             this.loading = false;
    //             this.snotifyService.info('Rejection of the proposal part number failed', 'Failed', {
    //             timeout: 2000,
    //             showProgressBar: true,
    //             closeOnClick: false,
    //             pauseOnHover: true,
    //                 position: SnotifyPosition.centerTop,
    //                 backdrop: 0.5
    //             });
    //         }
    //     });
    // }

    // ApproveSummary(proposalCode)
    // {
    //         debugger;
    //         this.proposalDetail.action = 'Approved';
    //         this.proposalDetail.action_By = this.currentUser[0].userId;
    //         this.proposalDetail.action_On = new Date();
    //         this.proposalDetail.remarks = proposalCode.remarks;
    //         this._proposalapproveService.ApproveRejectProposalItem(this.proposalDetail).subscribe(result => {
    //             if(result){
    //             this.loading = false;
    //             this.snotifyService.info('Successfully approved the proposal part number', 'Success', {
    //               timeout: 2000,
    //               showProgressBar: true,
    //               closeOnClick: false,
    //               pauseOnHover: true,
    //               position: SnotifyPosition.centerTop,
    //               backdrop: 0.5
    //             });
    //             this.getApprovalProposalList();
    //             //ApproverDenyDetails.hide();
    //             //this.setPage(1);
    //             }else{
    //                 this.loading = false;
    //                 this.snotifyService.info('Approval of the proposal part number failed', 'Failed', {
    //                 timeout: 2000,
    //                 showProgressBar: true,
    //                 closeOnClick: false,
    //                 pauseOnHover: true,
    //                 position: SnotifyPosition.centerTop,
    //                 backdrop: 0.5
    //             });
    //             }
    //         });
    // }  

      reset(form) {
        form.reset();
      }
}