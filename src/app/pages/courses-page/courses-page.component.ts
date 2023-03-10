import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authenticatedUserSelector } from 'src/app/auth/store/auth.actions';
import { AppState } from 'src/app/core/models/app-state.model';
import { Course } from 'src/app/models/courses.model';
import { Student } from 'src/app/models/student.model';
import { CoursesService } from 'src/app/services/courses.service';
import { CourseDetailDialogComponent } from 'src/app/shared/components/course-detail-dialog/course-detail-dialog.component';
import { CourseDialogComponent } from 'src/app/shared/components/course-dialog/course-dialog.component';
import { DeleteAlertDialogComponent } from 'src/app/shared/components/delete-alert-dialog/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
  user: any;
  public courses$!: Observable<Course[]>;
  private readonly customDeleteTitle = "Confirma eliminar este curso?";
  private readonly customDeleteDetail = "Se eliminaran todos los datos y las inscripciones de los alumnos"

  displayedColumns = ['course', 'description', 'details'];

  constructor(
    private readonly _dialogService: MatDialog,
    private readonly _coursesService: CoursesService,
    private readonly _store: Store<AppState>
  )
  {
  }

  ngOnInit() : void{
    this.courses$ = this._coursesService.courses$;
    this._store.select(authenticatedUserSelector).subscribe((user) => {
      this.user = user;
      this.setAdminOptions();
    });
  }

  setAdminOptions(){
    if(this.user.isAdmin) {
      this.displayedColumns.push('edit');
      this.displayedColumns.push('delete');
    }
  }

  viewCourseDetails(courseId: number) {
    let course = this._coursesService.getCourseById(courseId);
    let students = this._coursesService.getInscribedStudentsByCourseId(courseId);
    const dialogRef = this._dialogService.open(CourseDetailDialogComponent, {
      width: '450px',
      data: {
        course: course,
        students: students
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addCourse() {
    const dialog = this._dialogService.open(CourseDialogComponent)

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this._coursesService.addCourse(value);
      }
    })
  }

  removeCourse(course: Course) {
    this._coursesService.removeCourse(course.id)
  }

  editCourse(course: Course) {
    const dialog = this._dialogService.open(CourseDialogComponent,
    {
      data: course,
    })

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this._coursesService.editCourse(course.id, data);
      }
    })
  }

  openDeleteDialog(course: Course): void {
    const dialogRef = this._dialogService.open(DeleteAlertDialogComponent,
      {
        data: {
          customTitle: this.customDeleteTitle,
          customDetail: this.customDeleteDetail
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeCourse(course);
      }
   });
 }

  getInscribedStudentsByCourseId(courseId: number): Student[] {
    return this._coursesService.getInscribedStudentsByCourseId(courseId);
  }
}
