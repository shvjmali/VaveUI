import { Injectable, OnInit } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Observable } from 'rxjs';
import { DataService } from '../_core/data.service';
import { PartComponent } from '../_shared/model/partComponent';

@Injectable({
  providedIn: 'root'
})
export class ProposalViewService implements OnInit {
  
  allImages = [];
  
  constructor(private dataService: DataService) { }

  ngOnInit() { }

  // getProposalDetails(proposalID) {
  //   return this.dataService.getData('Master/GetProposalDetail/' + proposalID).map(response => {
  //     return response;
  //   });
  // }

  GetApprovedProposalDetail(proposalID) {
    return this.dataService.getData('Master/GetApprovedProposalDetail/' + proposalID).map(response => {
      return response;
    });
  }


  //commented as not working shivaji 11-01-22
  // getSAProposalDetails(proposalID) {
  //   return this.dataService.getData('Master/GetSAProposalDetail/' + proposalID).map(response => {
  //     return response;
  //   });
  // }

  saveLogDetails(LogDetails) {
    return this.dataService.postElement('Master/SaveLogDetails', LogDetails)
          .map(res => {
            return res;
          });
    // return this.dataService.getData('Master/GetProposalDetail/' + LogDetails).map(response => {
    //   return response;
    // });
  }
  
  getPartDetails(partNumber) {
    return this.dataService.getData('Master/GetPartDetails/' + partNumber).map(response => {
      return response;
    });
  }

  getDocumentDetails(DetailID){
    return this.dataService.getData('Master/GetDocumentDetail/' + DetailID).map(response => {
      return response;
    });
  }

  getImages() {    
    return this.allImages = Imagesdelatils.slice(0);    
  }    

  getImage(id: number) {    
      return Imagesdelatils.slice(0).find(Images => Images.id == id)    
  }
}

const Imagesdelatils = [    
  { "id": 1, "brand": "Apple", "url": "assets/img/logo1.png" }]    
