import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { InscriptionPageComponent } from './inscription-page/inscription-page.component';
import { StudentsModule } from './students-page/students.module';
import { CoursesModule } from './courses-page/courses.module';
import { InscriptionsModule } from './inscription-page/inscriptions.module';


@NgModule({
  imports: [
    StudentsModule,
    CoursesModule,
    InscriptionsModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    StudentsModule,
    CoursesModule,
    InscriptionsModule,  ]
})
export class PagesModule { }
