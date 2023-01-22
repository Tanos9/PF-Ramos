import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'students',
        loadChildren: () => import('../pages/students-page/students.module')
          .then((module) => module.StudentsModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('../pages/courses-page/courses.module')
          .then((module) => module.CoursesModule)
      },
      {
        path: 'inscriptions',
        loadChildren: () => import('../pages/inscription-page/inscriptions.module')
          .then((module) => module.InscriptionsModule)
      }
    ]
  }]
;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
