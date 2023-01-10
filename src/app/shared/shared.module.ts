import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from './modules/my-material.module';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { TitlesSizeDirective } from './custom-directives/titles-size.directive';
import { FullNamePipe } from './custom-pipes/full-name-pipe';
import { HeaderComponent } from './layout/header/header.component';
import { SideMenuComponent } from './layout/menu/side-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { StudentDetailDialogComponent } from './components/student-detail-dialog/student-detail-dialog.component';
import { CourseDetailDialogComponent } from './components/course-detail-dialog/course-detail-dialog.component';
import { DeleteAlertDialogComponent } from './components/delete-alert-dialog/delete-alert-dialog/delete-alert-dialog.component';

@NgModule({
  declarations: [
    StudentDialogComponent,
    TitlesSizeDirective,
    FullNamePipe,
    HeaderComponent,
    SideMenuComponent,
    CourseDialogComponent,
    InscriptionDialogComponent,
    StudentDetailDialogComponent,
    CourseDetailDialogComponent,
    DeleteAlertDialogComponent,
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    StudentDialogComponent,
    TitlesSizeDirective,
    FullNamePipe,
    HeaderComponent,
    SideMenuComponent,
    MyMaterialModule
  ]
})
export class SharedModule { }
