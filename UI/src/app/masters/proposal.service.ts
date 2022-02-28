import { Injectable, OnInit } from '@angular/core';
import { DataService } from '../_core/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit() { }

  getProposalList(DetailID) {
    return this.dataService.getData('Master/GetProposalList/' + DetailID).map(response => {
      return response;
    });
  }

  getAProposalList() {
    return this.dataService.getData('Master/GetProposalList/').map(response => {
      return response;
    });
  }
}