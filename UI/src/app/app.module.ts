import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './_shared/nav-dropdown.directive';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './_shared/sidebar.directive';
import { AsideToggleDirective } from './_shared/aside.directive';
import { BreadcrumbsComponent } from './_shared/breadcrumb.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
// Routing Module
import { AppRoutingModule } from './app.routing';
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { DataService } from './_core/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './account/user-service';
//import { ToastrModule } from 'toastr-ng2';
//import { ToastrModule } from 'toastr-ng2';
//import { DashboardService } from './xmltoexceltransformation/dashboard.service';
import { SingleLayoutComponent } from './layouts/single-layout.component';
import { PagerService } from './_core/pager.service';
import { NgxLoadingModule } from 'ngx-loading';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { CompairValidator } from './_shared/compair-validator.directive';
import { EscapeHtmlPipe } from './_shared/keep-html.pipe';
//import { ImageDetailsComponent } from './masters/image-details/image-details.component';
//import { ReportService } from './xmltoexceltransformation/report.service';
//import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    //ToastrModule.forRoot(),
    ChartsModule,
    PdfJsViewerModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    //ToastrModule.forRoot(),
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    SnotifyModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    SingleLayoutComponent,
    CompairValidator,
    EscapeHtmlPipe
    //ImageDetailsComponent,
  ],
  providers: [
    [DataService, UserService, PagerService, SnotifyService],
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
