import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { SingleLayoutComponent } from './layouts/single-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      // title: 'Home'
    },
    children: [
      {
        path: 'access-permission',
        loadChildren: './accessPermission/access-permission.module#AccessPermissionModule'
      },
      {
        path: 'access',
        loadChildren: './accessPermission/access-permission.module#AccessPermissionModule'
      },
      {
        path: 'masters-add',
        loadChildren: './masters/masters.module#MastersModule'
      },
      {
        path: 'home',
        loadChildren: './vaveportal/vaveportal.module#VavePortalModule'
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
