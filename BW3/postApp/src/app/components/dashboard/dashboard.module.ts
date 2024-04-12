import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
// import { CardComponent } from '../card/card.component';
import { CardModule } from '../card/card.module';


@NgModule({
  declarations: [
    DashboardComponent,
    // CardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule
  ]
})
export class DashboardModule { }
