import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { ExportToExcelService } from '../../_core/export-to-excel.service';
import { DataService } from '../../_core/data.service';
import * as _ from 'underscore';
import { ReportService } from '../report.service';
import { PartMasterDownload } from '../../_shared/model/part-master-download';
import { ProposalMasterDownload } from '../../_shared/model/proposal-master-download';
import { ProposalMasterModel } from '../../_shared/model/ProposalMasterModel';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  selectedvalue: string;
  DetailID: number;
  currentUser:any;

  constructor(
    private _route: Router,
    //private Exportoexcel: ExportToExcelService,
    private reportService: ReportService
  ) { this.currentUser=null; }


  ngOnInit() {
    this.currentUser = JSON.parse(
      sessionStorage.getItem('currentUser')
      //localStorage.getItem('currentUser')
    );

  }

  onChangeEvent(event) {
    this.selectedvalue=event.target.value;
  }
  
  download()  {
    
    if (this.selectedvalue === 'GetAllPartList') {
        this.GetAllPartList();
      } else {
        this.GetAllProposalList();
      }

  }

   
  GetAllPartList() {
    debugger
    var name = this.currentUser[0].firstName + " " + this.currentUser[0].lastName;
    this.reportService.getPartList(name).subscribe(item => {
      if (item != null) {
       // debugger;
        const data = item;
        this.ExportToExcel(data);
      }
    });
  }


  ExportToExcel(items: any) {
   
   // debugger;
    const data = _.map(items, function (o) {
      return _.pick(
        o,
        'id',
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
        'series',
        'status',
        'weight',
        'rank',
        'remarks'
       

      );
    });

    this.reportService.downloadFile(data, 'Part Master Report');

  }


  GetAllProposalList() {
   // debugger;
    var name = this.currentUser[0].firstName + " " + this.currentUser[0].lastName;
    this.reportService.GetProposalList(name).subscribe(item => {
      if (item != null) {
       // debugger;
        const data = item;
        this.ExportToCSV(data);
      }
    });
  }
  ExportToCSV(items: any) {
   // debugger;
    const data = _.map(items, function (o) {
      return _.pick(
        o,
        'proposalID',
        'proposalNumber',
        'proposalType',
        'teamCode',
        'partList',
        'createdBy',
        'lastUpdatedBy'
        
        
        //'createdBy',
        //'createdDate'
        
        

      );
    });

    this.reportService.proposaldownloadFile(data, 'Proposal Master Report');

  }

}