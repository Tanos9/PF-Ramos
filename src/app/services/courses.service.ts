import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/courses.model';
import { Student } from '../models/student.model';
import { DataAccessService } from './data-access.service';
import { InscriptionsService } from './inscriptions.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public courses$: Observable<Course[]>;

  constructor(
    private readonly _dataAccess: DataAccessService,
    private readonly _inscriptionService: InscriptionsService)
  {
    this.courses$ = this._dataAccess.courses$;
  }

  getCourses(): Course[] {
    return this._dataAccess.getCourses().slice();
  }

  getCourseById(courseId: number) {
    return this._dataAccess.getCourses().find(s => s.id === courseId);
  }

  addCourse(course: Course) {
    this._dataAccess.addCourseFromAPI(course);
  }

  editCourse(id: number, course: Course) {
    course.id = id;
    this._dataAccess.editCourseFromAPI(course);
  }

  removeCourse(id: number) {
    this._inscriptionService.removeInscriptionsByCourseId(id);
    this._dataAccess.deleteCourseFromAPI(id);
  }

  getInscribedStudentsByCourseId(courseId: number): Student[] {
    return this._dataAccess.getInscriptions()
      .filter((inscription) => inscription.courseId == courseId)
      .map((inscription) => this._dataAccess.getStudents()
        .find((student) => student.id === inscription.studentId))
      .filter((student): student is Student => !!student);
  }
}
