import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from '../models/courses.model';
import { DataAccessService } from './data-access.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesListChanged = new Subject<Course[]>();
  public coursesListChanged$ = this.coursesListChanged.asObservable();

  constructor(private readonly _dataAccess: DataAccessService) { }

  getCourses(): Course[] {
    return this._dataAccess.courses.slice();
  }

  addCourse(course: Course) {
    course.id = this.getNextId();
    this._dataAccess.courses.push(course);
    this.coursesListChanged.next(this._dataAccess.courses.slice());
  }

  editCourse(id: number, course: Course) {
    let index = this.findCourseIndexById(id);
    course.id = id;
    this._dataAccess.courses[index] = course;

    this.coursesListChanged.next(this._dataAccess.courses.slice());
  }

  removeCourse(id: number) {
    let index = this.findCourseIndexById(id);
    this._dataAccess.courses.splice(index, 1);

    this.coursesListChanged.next(this._dataAccess.courses.slice());
  }

  private findCourseIndexById(id: number) {
    return this._dataAccess.courses.findIndex(s => s.id === id)
  }
  
  private getNextId(): number {
    const maxId = this._dataAccess.courses.reduce((prev, curr) => Math.max(prev, curr.id), 0);
    return maxId + 1;
  }
}
