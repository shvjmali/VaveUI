import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { TwistcodesComponent } from './twistcodes/twistcodes.component';
import { ShieldcodesComponent } from './shieldcodes/shieldcodes.component';
import { PartsComponent } from './parts/parts.component';
import { ProposalComponent } from './proposal/proposal.component';
import { DUploadComponent } from './dupload/dupload.component';
import { ViewPartComponent } from './viewpart/viewpart.component';
import { ProposalApproveComponent } from './proposalapprove/proposalapprove.component';
import { SnotifyModule } from 'ng-snotify';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { MasterdashboardComponent } from './masterdashboard/masterdashboard.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { ModalModule } from 'ngx-bootstrap';
import { ExportToExcelService } from '../_core/export-to-excel.service';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { MytaskComponent } from './mytask/mytask.component';
import { ManagementdComponent } from './managementd/managementd.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ReportComponent } from './report/report.component';
// import { ParteditComponent } from './partedit.component';
import { ParteditComponent } from './partedit/partedit.component';

@NgModule({
  declarations: [ManagementdComponent, MytaskComponent, TwistcodesComponent, ShieldcodesComponent, PartsComponent, ProposalComponent, DUploadComponent, ViewPartComponent, ProposalApproveComponent, MasterdashboardComponent, ImageDetailsComponent, CreateProposalComponent, ReportComponent,ParteditComponent],
  imports: [
    CommonModule,
    FormsModule,
    MastersRoutingModule,
    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    SnotifyModule,
    ChartsModule,
    PdfJsViewerModule
  ],
  providers: [ 
    ExportToExcelService
  ]
})
export class MastersModule { }