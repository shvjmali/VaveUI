import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessPermissionComponent } from './access-permission.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AccessPermissionComponent,
    data: {
      isLogin: true,
      title: 'Access'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [RoleGaurd],
    data: {
      title: 'dashboard',
      expectedRole: 'ADMIN'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessPermissionRoutingModule {}
