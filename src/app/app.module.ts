import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MatFormFieldModule, MatSelectModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
/**
 * Fusion charts
 */
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


/*
** Application components
*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SpotrecogComponent } from './spotrecog/spotrecog.component';
import { AppRoutingModule } from './app-routing.module';
import {FormalrecogComponent} from './formalrecog/formalrecog.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { ReportsComponent } from './reports/reports.component';
import { ChartsComponent } from './charts/charts.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReportslistComponent } from './reportslist/reportslist.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DropdownModule } from 'angular-bootstrap-md';

import { MyDateRangePickerModule } from 'mydaterangepicker';
import { FiltersitePipe } from './filtersite.pipe';
 
import { ToastrModule } from 'ngx-toastr';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { SpotrecogService } from './spotrecog/spotrecog.service';
import { FormalreportsComponent } from './formalreports/formalreports.component';
import { SpotreportsComponent } from './spotreports/spotreports.component';
import { FormalreportEditComponent } from './formalreport-edit/formalreport-edit.component';
import { FormalreportDeleteComponent } from './formalreport-delete/formalreport-delete.component';
import { SpotreportEditComponent } from './spotreport-edit/spotreport-edit.component';
import { SpotreportDeleteComponent } from './spotreport-delete/spotreport-delete.component';
import { FormalapprovalsComponent } from './formalapprovals/formalapprovals.component';
import { ApprovalDetailsComponent } from './approval-details/approval-details.component';

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpotrecogComponent,
    FormalrecogComponent,
    HomeComponent,
    HelpComponent,
    ContactComponent,
    ReportsComponent,
    ChartsComponent,
    ReportslistComponent,
    FiltersitePipe,
    FormalreportsComponent,
    SpotreportsComponent,
    FormalreportEditComponent,
    FormalreportDeleteComponent,
    SpotreportEditComponent,
    SpotreportDeleteComponent,
    FormalapprovalsComponent,
    ApprovalDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MatCardModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FusionChartsModule,
    AngularFontAwesomeModule,
    MyDateRangePickerModule ,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      maxOpened:0,
      autoDismiss:false,
      timeOut:  1000,
    })
  ],
  providers: [SpotrecogService,   Adal6Service,
    { provide: Adal6HTTPService, useFactory: Adal6HTTPService.factory, deps: [HttpClient, Adal6Service] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
