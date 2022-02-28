import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VavePortalRoutingModule } from './vaveportal-routing.module' //from './xmltoexceltransformation-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { SnotifyModule } from 'ng-snotify';
import { ReportsComponent } from './reports/reports.component';
import { ProposalViewComponent } from './proposalview/proposalview.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ExportToExcelService } from '../_core/export-to-excel.service';
import { DocDisplayComponent } from './docdisplay/docdisplay.componenet';
import { ModalModule } from 'ngx-bootstrap';

//import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent, ReportsComponent, ProposalViewComponent, DocDisplayComponent],
  imports: [
    CommonModule, 
    VavePortalRoutingModule, 
    FormsModule, 
    NgxLoadingModule.forRoot({}), 
    SnotifyModule, 
    ModalModule.forRoot(),
    PdfJsViewerModule,
    ReactiveFormsModule
  ],
  providers: [ExportToExcelService]
})
export class VavePortalModule {}
