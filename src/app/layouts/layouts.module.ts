import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from '../pages/pages.module';



@NgModule({
  declarations: [
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesModule
  ],
  exports: [
    DashboardLayoutComponent
  ]
})
export class LayoutsModule { }
