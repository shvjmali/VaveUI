import { Injectable, OnInit } from '@angular/core';
import { DataService } from '../_core/data.service';
import { Observable } from 'rxjs';
import { ProposalMasterModel } from '../_shared/model/ProposalMasterModel';
import { ControlRequestModel } from '../_shared/model/ControlRequestModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit {
  constructor(private dataService: DataService) { }
  ngOnInit() { }

  getProposalList(Details) {
    return this.dataService.getData('Master/GetProposalList/' + Details).map(response => {
      return response;
    });
  }

  requestProposalDetails(cntrolRequestModel: ControlRequestModel) {
    return this.dataService.postElement('Master/RequestProposalDetail', cntrolRequestModel).map(response => {
      return response;
    });
  }
}
