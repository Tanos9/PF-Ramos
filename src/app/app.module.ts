import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/layout/header/header.component';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { MyMaterialModule } from './shared/modules/my-material.module';
import { StudentDialogComponent } from './shared/components/student-dialog/student-dialog.component';
import { SideMenuComponent } from './shared/layout/menu/side-menu.component';
import { MatSelectModule } from '@angular/material/select';
import { TitlesSizeDirective } from './shared/custom-directives/titles-size.directive';
import { FullNamePipe } from './shared/custom-pipes/full-name-pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsPageComponent,
    StudentDialogComponent,
    SideMenuComponent,
    TitlesSizeDirective,
    FullNamePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
