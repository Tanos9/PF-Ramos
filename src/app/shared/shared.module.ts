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



@NgModule({
  declarations: [
    StudentDialogComponent,
    TitlesSizeDirective,
    FullNamePipe,
    HeaderComponent,
    SideMenuComponent,
    CourseDialogComponent,
    InscriptionDialogComponent,
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
