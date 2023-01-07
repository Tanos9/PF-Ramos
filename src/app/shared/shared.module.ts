import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from './modules/my-material.module';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { TitlesSizeDirective } from './custom-directives/titles-size.directive';
import { FullNamePipe } from './custom-pipes/full-name-pipe';
import { HeaderComponent } from './layout/header/header.component';
import { SideMenuComponent } from './layout/menu/side-menu.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StudentDialogComponent,
    TitlesSizeDirective,
    FullNamePipe,
    HeaderComponent,
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    ReactiveFormsModule
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