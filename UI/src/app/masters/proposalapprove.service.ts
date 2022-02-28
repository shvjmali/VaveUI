import { Injectable, OnInit } from '@angular/core';
import { DataService } from '../_core/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalApproveService implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit() { }
  
  getApprovalProposalItemList() {
    return this.dataService.getData('Master/GetAProposalList').map(response => {
      return response;
    });
  }

  ApproveRejectProposalItem(proposalDetail: any) {    
    return this.dataService
      .postElement('Master/ApprovalDenyProposalItem/', proposalDetail)
      .map(response => {
        return response;
      });
  }

  GetProposalItemDetail(DetailID){
    return this.dataService.getData('Master/GetProposalItemDetail/' + DetailID).map(response => {
      return response;
    });
  }
}