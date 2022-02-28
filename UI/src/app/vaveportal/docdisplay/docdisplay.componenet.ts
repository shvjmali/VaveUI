import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../_core/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ProposalMasterModel } from '../../_shared/model/ProposalMasterModel';
import { ProposalViewService } from '../proposalview.service';
import { PartComponent } from '../../_shared/model/partComponent';
import { PartDocumentModel } from '../../_shared/model/partdocumentmodel';
import * as _ from 'underscore';
import { ExportToExcelService } from '../../_core/export-to-excel.service';

@Component({
    selector: 'app-docdisplay',
    templateUrl: './docdisplay.component.html'
  })
  export class DocDisplayComponent implements OnInit {
    currentUser: any;
    pager: any = {};
    pagedItems: ProposalMasterModel[] = [];
    loading = false;  
    proposalData: ProposalMasterModel = new ProposalMasterModel();
    proposalCodes: ProposalMasterModel[] = [];
    proposalCode: ProposalMasterModel = new ProposalMasterModel();
    sortdata: any = [];
    proposalNumber: string;
    proposalID: number;
    partcomponent: PartComponent = new PartComponent();
    partDocumentModel: PartDocumentModel = new PartDocumentModel();
    //dictprop: Map<string, [Map<string,string>]>;
    colLength: Number;
    commodityType: string;
    docid: Number; 
    constructor(
        //dictprop = new Map<string, [Map<string,string>]>(),
        private _route: Router,
        private _aroute: ActivatedRoute,
        private _proposalviewService: ProposalViewService,
        private pagerService: PagerService,
        private snotifyService: SnotifyService,
        private Exportoexcel: ExportToExcelService    
    ) { }

    ngOnInit() {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.loading = true;
        this._aroute.queryParams.subscribe(params => {
            this.docid = params.id;        
        });
        this.getDocumentDetail();
        // this._aroute.queryParams.subscribe(params => {
        //     this.proposalID = params.proposalID;        
        // });
        //this.getProposalDetail();
        this.loading = false;
    }

    getDocumentDetail(){
        debugger;
            this._proposalviewService.getDocumentDetails(this.docid).subscribe(docresult => {
                if (docresult != null) {
                    this.partDocumentModel = new PartDocumentModel();
                    this.partDocumentModel.id = docresult.id;
                    this.partDocumentModel.doc_name = docresult.doc_Name;
                    this.partDocumentModel.doc_type = docresult.doc_Type;
                    this.partDocumentModel.partnumber = docresult.partNumber;
                    if(docresult.doc_Type == "Image"){
                        this.partDocumentModel.doc_path = "assets\\pdfjs\\web\\" + docresult.doc_Path;    
                    }else{
                        this.partDocumentModel.doc_path = docresult.doc_Path;
                    }
                    //this.partcomponent.ldocumentlist.push(this.partDocumentModel);
                    
                }
            });
        
    }
}