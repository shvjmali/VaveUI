import { Component, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ProposalService } from '../proposal.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ProposalMasterModel } from '../../_shared/model/ProposalMasterModel';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService, ToastConfig } from 'toastr-ng2';


@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html'
})
export class CreateProposalComponent implements OnInit {
    loading = false;
    constructor(
        private _CreateProposalService: ProposalService,
        //private _toastrService: ToastrService,
        private route: ActivatedRoute,
        private _route: Router,
        protected changeDetectorRef: ChangeDetectorRef
      ){

      }
    ngOnInit() {
        this.loading = true;
        //this.getProposalList();
        this.loading = false;
      }
    
    reset(form) {
        form.reset();
    }
}