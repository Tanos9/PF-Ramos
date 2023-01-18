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
  private readonly URL = 'https://63c7156edcdc478e15cf23bb.mockapi.io/';
  public courses$: Observable<Course[]>;

  constructor(
    private readonly _dataAccess: DataAccessService,
    private readonly _inscriptionService: InscriptionsService)
  {
    this.courses$ = this._dataAccess.courses$;
  }

  getCourses(): Course[] {
    return this._dataAccess.courses.slice();
  }

  getCourseById(courseId: number) {
    return this._dataAccess.courses.find(c => c.id === courseId)
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

  getInscribedStudentsByCourseId(courseId: number): Student[]  {
    return this._inscriptionService.getInscribedStudentsByCourseId(courseId);
  }
}
