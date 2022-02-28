import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule, PopoverModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccessPermissionComponent } from './access-permission.component';
import { AccessPermissionRoutingModule } from './access-permission-routing.module';
import { AccessPermissionService } from './access-permission.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagerService } from '../_core/pager.service';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  imports: [
    AccessPermissionRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    // NgxTypeaheadModule,
  ],
  declarations: [AccessPermissionComponent, DashboardComponent],
  providers: [AccessPermissionService, PagerService]
})
export class AccessPermissionModule {}
