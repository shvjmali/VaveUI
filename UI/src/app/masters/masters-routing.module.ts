import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwistcodesComponent } from './twistcodes/twistcodes.component';
import { ShieldcodesComponent } from './shieldcodes/shieldcodes.component';
import { MasterdashboardComponent } from './masterdashboard/masterdashboard.component';
import { PartsComponent } from './parts/parts.component';
import { ProposalComponent } from './proposal/proposal.component';
import { DUploadComponent } from './dupload/dupload.component';
import { ViewPartComponent } from './viewpart/viewpart.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { ProposalApproveComponent } from './proposalapprove/proposalapprove.component';
import { MytaskComponent } from './mytask/mytask.component';
import { ManagementdComponent } from './managementd/managementd.component';
import { ReportComponent } from './report/report.component';
import { ParteditComponent } from './partedit/partedit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterdashboardComponent,
    data: {
      title: 'Master Dashboard'
    }
  },
  {
    path: 'Mdashboard',
    component: MasterdashboardComponent,
    data: {
      title: 'Master Dashboard'
    }
  },
  {
    path: 'twist',
    component: TwistcodesComponent,
    data: {
      title: 'Twist'
    }
  },
  {
    path: 'shield',
    component: ShieldcodesComponent,
    data: {
      title: 'Shield'
    }
  },
  {
    path: 'part',
    component: PartsComponent,
    data: {
      title: 'Part'
    }
  },
  {
    path: 'proposal',
    component: ProposalComponent,
    data: {
      title: 'Proposal'
    }
  },
  {
    path: 'mytask',
    component: MytaskComponent,
    data: {
      title: 'Mytask'
    }
  },
  {
    path: 'managementd',
    component: ManagementdComponent,
    data: {
      title: 'Managementd'
    }
  },
  {
    path: 'proposalapprove',
    component: ProposalApproveComponent,
    data: {
      title: 'ProposalApprove'
    }
  },
  {
    path: 'dupload',
    component: DUploadComponent,
    data: {
      title: 'DUpload'
    }
  },
  {
    path: 'viewpart',
    component: ViewPartComponent,
    data: {
      title: 'ViewPart'
    }
  },
  {
    path: 'image',
    component: ImageDetailsComponent,
    data: {
      title: 'Image'
    }
  },
  {
    path: 'report',
    component: ReportComponent,
    data: {
      title: 'report'
    }
  },
  {
    path: 'partedit',
    component: ParteditComponent ,
    data: {
      title: 'partedit'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule {}