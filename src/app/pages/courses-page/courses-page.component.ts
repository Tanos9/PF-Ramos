import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { CourseDialogComponent } from 'src/app/shared/components/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
  courses: Course[] = [];

  displayedColumns = ['course', 'description', 'edit', 'delete'];

  constructor(
    private readonly _dialogService: MatDialog,
    private readonly _coursesService: CoursesService
  )
  {
    this._coursesService.coursesListChanged$.subscribe(() => {
      this.courses = _coursesService.getCourses();
    });
  }

  ngOnInit(){
    this.courses = this._coursesService.getCourses();
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
  
}
