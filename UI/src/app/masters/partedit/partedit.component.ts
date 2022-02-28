// import { Component, OnInit } from '@angular/core';

import { Component, OnChanges, OnInit, ViewChild, NgZone } from '@angular/core';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../../_core/pager.service';
import { ViewPartService } from '../ViewPart.Service';
import { PartComponent } from '../../_shared/model/partComponent';
import { UserService } from '../../account/user-service';
import { PartDocumentModel } from '../../_shared/model/PartDocumentModel';

@Component({
  selector: 'app-partedit',
  templateUrl: './partedit.component.html',
  styleUrls: ['./partedit.component.scss']
})
export class ParteditComponent implements OnInit {

  [x: string]: any;
  currentUser: any;
  loading = false;
  partNumber: any;
  partDocumentModel: PartDocumentModel = new PartDocumentModel();
  partcomponent: PartComponent;
  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  @ViewChild('viewer') public embeddedPdfViewer;
  isPdfLoaded = false;
  zoom = 'auto';

  pdfLoaded() {
      console.log(this.embeddedPdfViewer);
      this.isPdfLoaded = !this.isPdfLoaded;
  }

  allImages = [];    
  
  // getImages() {    
  //     return this.allImages = Imagesdelatils.slice(0);    
  // }    
  
  // getImage(id: number) {    
  //     return Imagesdelatils.slice(0).find(Images => Images.id == id)    
  // }

  constructor( private _route: Router,
    private ngZone: NgZone,
    private _aroute: ActivatedRoute,
    private _viewpartService: ViewPartService,
    private _UserService: UserService,
    private pagerService: PagerService,
    private snotifyService: SnotifyService) 
    {
      this.allImages = this._viewpartService.getImages();
    }

    ngOnChanges() {    
      this.allImages = this._viewpartService.getImages();    
  }
  ngOnInit() {
    debugger;
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.loading = true;
        this.partcomponent = new PartComponent();
    
        this._aroute.queryParams.subscribe(params => {
            this.partNumber = params.partNumber;        
        });
        this.getPartDetail();
        this.loading = false;
  }
  getPartDetail() {
    debugger;
    if (this.currentUser[0].role_Code === 'APP_ADMIN' || this.currentUser[0].role_Code === 'SUPER_ADMIN') {
        this._viewpartService.getPartDetails(this.partNumber).subscribe(result => {
            if (result != null) {
                debugger;
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
                //this.partcomponent.drawingTab = result.drawingTab;
                this.partcomponent.gender = result.gender;
                this.partcomponent.height = result.height_mm;
                this.partcomponent.hybrid = result.hybrid;
                //this.partcomponent.imageTab = result.imageTab;
                this.partcomponent.tpartnumber = result.internalPartNumber;
                //this.partcomponent.isActive = result.isActive;
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
                        //this.partDocumentModel.txtyazakipartno
                        if(docresult.doc_Type == "Image"){
                            this.partDocumentModel.doc_path = "assets\\pdfjs\\web\\" + docresult.doc_Path;    
                        }else{
                            this.partDocumentModel.doc_path = docresult.doc_Path;
                        }
                        this.partcomponent.ldocumentlist.push(this.partDocumentModel);
                        this.partDocumentModel = new PartDocumentModel();
                    });    
                }

                console.log(result);
            }
        });
    }
  }
  ViewPartDetail(item: any) {
    this._route.navigate([]).then(result => {  window.open('/#/masters-add/viewpart?partNumber=' + item, '_blank'); });    
}

ViewDocument(id: number){
    debugger;
    this._route.navigate([]).then(result => {  window.open('/#/home/docdisplay?id=' + id, '_blank'); });  
}

}
const Imagesdelatils = [ ];
