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
import { LogDetails } from '../../_shared/model/LogDetails';

@Component({
    selector: 'app-proposalview',
    templateUrl: './proposalview.component.html'
  })
  export class ProposalViewComponent implements OnInit {

    //pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    currentUser: any;
    role: string;
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
    colLength: Number;
    commodityType: string; 
    logdetails: LogDetails = new LogDetails();
    constructor(
        private _route: Router,
        private _aroute: ActivatedRoute,
        private _proposalviewService: ProposalViewService,
        private pagerService: PagerService,
        private snotifyService: SnotifyService,
        private Exportoexcel: ExportToExcelService    
    ) { }

    ngOnInit() {
        this.loading = true;
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this._aroute.queryParams.subscribe(params => {
            this.proposalID = params.proposalID;        
        });
        //this.getProposalDetail();
        this.GetApporvedProposal();
        this.SaveLogDetails()
        this.role = this.currentUser[0].role_Code;
        this.loading = false;
    }    

    @ViewChild('viewer') public embeddedPdfViewer;
    isPdfLoaded = false;
    zoom = 'auto';

    pdfLoaded() {
        console.log(this.embeddedPdfViewer);
        this.isPdfLoaded = !this.isPdfLoaded;
    }

    SaveLogDetails(){
        debugger;
        //this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.logdetails.UserId = this.currentUser[0].userId;
        this.logdetails.UserName = this.currentUser[0].userName;
        this.logdetails.ProposalID = this.proposalID;
        this.logdetails.ProposalNumber = this.proposalData.ProposalNumber;
        this._proposalviewService.saveLogDetails(this.logdetails).subscribe();
    }

    //getProposalDetail(){
        GetApporvedProposal(){
        //this.loading = true;
        this._proposalviewService.GetApprovedProposalDetail(this.proposalID).subscribe(item => {
            if (item != null) {
                debugger;              
                this.proposalData.ProposalNumber = item.proposalNumber;
                this.proposalData.ProposalType = item.proposalType;
                this.proposalData.TeamCode = item.teamCode;
                if (item.lpartList != null && item.lpartList.length > 0) {
                this.colLength = item.lpartList.length;
                this.commodityType = item.lpartList[0].comodity;
                item.lpartList.forEach(result => {
                    //this.partcomponent.id = result.id;
                    this.partcomponent.id = result.id;
                    this.partcomponent.applicablewirerange = result.applicableWireRange;
                    this.partcomponent.bundledia = result.bundleDia_W_H;
                    this.partcomponent.color = result.color;
                    this.partcomponent.Comodity = result.comodity;
                    this.partcomponent.csa = result.csa;
                    this.partcomponent.customername = result.customerName;
                    this.partcomponent.customerpartnumber = result.customerPartNumber;
                    this.partcomponent.description = result.description;
                    this.partcomponent.gender = result.gender;
                    this.partcomponent.height = result.height_mm;
                    this.partcomponent.hybrid = result.hybrid;
                    this.partcomponent.tpartnumber = result.internalPartNumber;
                    this.partcomponent.lastupdatedby = result.lastUpdatedBy;
                    this.partcomponent.lastupdatedon = result.lastUpdatedOn;
                    this.partcomponent.length = result.length_mm;
                    this.partcomponent.material = result.material;
                    this.partcomponent.matingypn = result.matingPart;
                    this.partcomponent.maxtemp = result.maxTemp_degree;
                    this.partcomponent.mintemp = result.minTemp_degree;
                    this.partcomponent.noofpoles = result.noOfPoles;
                    this.partcomponent.noofstrands = result.noOfStrands;
                    this.partcomponent.od = result.outside;
                    this.partcomponent.panelthickness = result.panelThickNess;
                    this.partcomponent.pinrows = result.pinRowsLayout;
                    this.partcomponent.platingcolor = result.platingColor;
                    this.partcomponent.rank = result.rank;
                    this.partcomponent.relatedpart = result.relatedPart;
                    this.partcomponent.remarks = result.remarks;
                    this.partcomponent.sealdia = result.sealDia;
                    this.partcomponent.sealed = result.sealedUnSealed;
                    this.partcomponent.series = result.series;
                    this.partcomponent.status = result.status;
                    this.partcomponent.suppliername = result.supplierName;
                    this.partcomponent.supplierpartnumber = result.supplierPartNumber;
                    this.partcomponent.uom = result.uom;
                    this.partcomponent.wallthickness = result.wallThickness_mm;
                    this.partcomponent.weight = result.weight;
                    this.partcomponent.wholesize = result.wholeSize;
                    this.partcomponent.width = result.width_mm;
                    this.partcomponent.wireinsulationdiarange = result.wireInsulationDiaRange;
                    this.partcomponent.yazakipartnumber = result.yazakiPartNumber;
                    this.partcomponent.seal = result.applicableSeal;
                    this.partcomponent.dummyplug = result.aplicableDummyPlug;
                    this.partcomponent.accessory = result.applicableAccessory;
                    this.partcomponent.matingsupplierpart = result.MatingSupplierPart;
                    this.partcomponent.matingsuppliername = result.MatingSupplierName;
                    this.partcomponent.terminal = result.applicableTerminal;
                    this.partcomponent.grommethardness = result.grommetHardness
                    this.partcomponent.wirestandard = result.wireStandard; 

                    if (result.lDocumentList != null && result.lDocumentList.length > 0) {
                        result.lDocumentList.forEach(docresult => {
                            debugger;
                            this.partDocumentModel.id = docresult.id;
                            this.partDocumentModel.doc_name = docresult.doc_Name;
                            this.partDocumentModel.doc_type = docresult.doc_Type;
                            if(docresult.doc_Type == "Image"){
                                this.partDocumentModel.doc_path = "assets\\pdfjs\\web\\" + docresult.doc_Path;    
                            }else{
                                this.partDocumentModel.doc_path = docresult.doc_Path;
                            }
                            this.partcomponent.ldocumentlist.push(this.partDocumentModel);
                            this.partDocumentModel = new PartDocumentModel();
                        });    
                    }    
                    
                    this.proposalData.PartC.push(this.partcomponent);
                    this.partcomponent = new PartComponent();
                });
                }
                this.sortdata = item;
                //console.log(result);
            }
        });
        this.loading = false;
    }

    ViewDocument(id: number){
        debugger;
        this._route.navigate([]).then(result => {  window.open('/#/home/docdisplay?id=' + id, '_blank'); });  
    }

    setPage(page: number) {
        this.pager = this.pagerService.getPager(this.proposalCodes.length, page);
        this.pagedItems = this.proposalCodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }  
     
    reset(form) {
        form.reset();
    }

    ExportToExcel() {
        debugger;
        const data = _.map(this.sortdata.lpartList, function(o) {            
          return _.pick(            
              o,
              'yazakiPartNumber',
              'internalPartNumber',
              'comodity',
              'description',
              'supplierPartNumber',
              'supplierName',
              'customerPartNumber',
              'customerName',
              'noOfPoles',
              'pinRowsLayout',
              'sealedUnSealed',
              'gender',
              'platingColor',
              'color',
              'material',
              'hybrid',
              'width_mm',
              'length_mm',
              'height_mm',
              'uom',
              'maxTemp_degree',
              'minTemp_degree',
              'outside',
              'applicableWireRange',
              'wireInsulationDiaRange',
              'csa',
              'noOfStrands',
              'sealDia',
              'bundleDia_W_H',
              'wholeSize',
              'panelThickNess',
              'relatedPart',
              'series',
              'status',
              'weight',
              'rank'
            
          );
        });
        this.Exportoexcel.download(data, 'Proposal Report');
        // this._toastrService.success(
        //   'The gatepass downloaded successfully.',
        //   '',
        //   this.constants.toastrConfig
        // );
        
      }
  }  
  