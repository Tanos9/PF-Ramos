import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsPageComponent } from './students-page/students-page.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesPageComponent } from './courses-page/courses-page.component';

@NgModule({
  declarations: [
    StudentsPageComponent,
    CoursesPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    StudentsPageComponent
  ]
})
export class PagesModule { }
