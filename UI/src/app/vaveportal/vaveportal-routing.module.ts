import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { ProposalViewComponent } from './proposalview/proposalview.component';
import { DocDisplayComponent } from './docdisplay/docdisplay.componenet';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'Hdashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'proposalview',
    component: ProposalViewComponent,
    data: {
      title: 'ProposalView'
    }
  },
  {
    path: 'docdisplay',
    component: DocDisplayComponent,
    data: {
      title: 'DocDisplay'
    }
  },
  {
    path: 'report',
    component: ReportsComponent,
    data: {
      title: 'Reports'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VavePortalRoutingModule { }
