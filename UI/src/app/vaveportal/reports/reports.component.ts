import { Component, OnInit } from '@angular/core';
import { PlantCodes } from '../../_shared/model/PlantCodes-model';
import { FileDetailsModel } from '../../_shared/model/FileDetails-model';
import { DashboardService } from '../dashboard.service';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService } from 'ng-snotify';
import { ReportService } from '../report.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExportFileDetailsModel } from '../../_shared/model/ExportFileDetails-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  selectedPlantCode: any = -1;
  plantCodes: PlantCodes[];
  pager: any = {};
  pagedItems: ExportFileDetailsModel[] = [];
  loading = false;
  dateFrom: Date;
  dateTo: Date;
  fileDetails: ExportFileDetailsModel[] = [];
  fileData: ExportFileDetailsModel = new ExportFileDetailsModel();
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';


  constructor(
    private _dashboardService: DashboardService,
    private pagerService: PagerService,
    private snotifyService: SnotifyService,
    private _reportService: ReportService,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.loading = true;
    //this.GetPlantCode();
    this.loading = false;
  }
  
  
  search(form) {
    this.loading = true;
    this.dateFrom = form.controls.fromDate.value;
    this.dateTo = form.controls.toDate.value;
    this.fileDetails = [];
    this._reportService.GetSearchResult(this.selectedPlantCode, this.dateFrom, this.dateTo).subscribe(result => {
      if (result != null && result.length > 0) {
        console.log(result);
        result.forEach(item => {
          const sourceName = item.source.substr(item.source.lastIndexOf('\\') + 1).split('.')[0];
          this.fileData.plantCode = item.plantCode;
          this.fileData.date = this.datepipe.transform(item.date, 'dd/MM/yyyy hh:mm:ss');
          this.fileData.sourceFileName = sourceName;
          // this.fileData.status = item._status;
          this.fileData.uploadedBy = item.uploadedBy;
          // this.fileData.FileUploadCount = item.fileUploadCount;
          // this.fileData.UploadedById = item.uploadedById;
          this.fileDetails.push(this.fileData);
          this.fileData = new ExportFileDetailsModel();
        });
        // this.fileDetails.reverse();
        //this.setPage(1);
        this.loading = false;
      }
    });
    // console.log(this.selectedPlantCode);
    // console.log('data');
  }

  exportData(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.fileDetails);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'Report from date_' + this.dateFrom + ' to date_' + this.dateTo);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: this.EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + this.EXCEL_EXTENSION);
  }

  reset(form) {
    form.reset();
    this.selectedPlantCode = -1;
    this.fileDetails = [];
  }

}

