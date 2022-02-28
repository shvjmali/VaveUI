import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ProposalService } from '../proposal.service';
import { ProposalMasterModel } from '../../_shared/model/ProposalMasterModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html'
})
export class ProposalComponent implements OnInit {
  loading = false;
  proposalData: ProposalMasterModel = new ProposalMasterModel();
  proposalCodes: ProposalMasterModel[] = [];
  proposalCode: ProposalMasterModel = new ProposalMasterModel();
  pagedItems: ProposalMasterModel[] = [];
  sortdata: any = [];
  pager: any = {};
  searchVal: string;
  constructor(
    private pagerService: PagerService, 
    private _route: Router, 
    private snotifyService: SnotifyService, 
    private _proposalService: ProposalService) { }

  ngOnInit() {
    this.loading = true;
    this.getProposalList();
    this.loading = false;
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.proposalCodes.length, page);
    this.pagedItems = this.proposalCodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getProposalList() {
    debugger;
    this.proposalCodes = [];
    this._proposalService.getProposalList(0).subscribe(result => {
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
          this.proposalCodes.push(this.proposalCode);
          this.proposalCode = new ProposalMasterModel();
        });
        this.sortdata = result;
        console.log(result);
        this.setPage(1);
      }
    });
  }

  ViewProposalDetail(item: any) {
    this._route.navigate([]).then(result => {  window.open('/#/home/proposalview?proposalID=' + item.ProposalID, '_blank');
   });    
  }

  ViewPartDetail(item: any) {
    //masters-add/viewpart?partNumber
    this._route.navigate([]).then(result => {  window.open('/#/masters-add/viewpart?partNumber=' + item, '_blank'); });    
    // const url = this._route.serializeUrl(
    //   this._route.createUrlTree(['/#/masters-add/viewpart'], {
    //     queryParams: {
    //       partNumber: item,
    //     }
    //   })
    // );  
    // window.open(url, '_blank');  
  }
 
  reset(form) {
    form.reset();
  }
}