import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { SpotrecogComponent } from './spotrecog/spotrecog.component';
import {FormalrecogComponent} from './formalrecog/formalrecog.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { ReportsComponent } from './reports/reports.component';
import { ChartsComponent } from './charts/charts.component';
import { SpotreportsComponent } from './spotreports/spotreports.component';
import { FormalreportsComponent } from './formalreports/formalreports.component';
import { FormalapprovalsComponent } from './formalapprovals/formalapprovals.component';

const routes: Routes = [
  { path:"home", component: HomeComponent},
  { path:"spotRecognition", component: SpotrecogComponent},
  { path:"formalRecognition", component: FormalrecogComponent},
  { path:"spotReports", component: SpotreportsComponent},
  { path:"formalReports", component: FormalreportsComponent},
  { path:"help", component: HelpComponent},
  { path:"contact", component: ContactComponent},
  { path:"reports", component: ChartsComponent},
  { path:"formalApprovals", component: FormalapprovalsComponent},
  { path: '', redirectTo:'/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
