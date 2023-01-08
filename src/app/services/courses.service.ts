import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from '../models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [
    new Course(1, 'Matematica 1', 'Calculo Matemático'),
    new Course(2, 'Física 1', 'Fisica clásica'),
    new Course(3, 'Ingeniería y Sociedad', 'Ingeniería en la sociedad actual')
  ]

  private coursesListChanged = new Subject<Course[]>();
  public coursesListChanged$ = this.coursesListChanged.asObservable();

  constructor() { }

  getCourses(): Course[] {
    return this.courses.slice();
  }

  addCourse(course: Course) {
    course.id = this.getNextId();
    this.courses.push(course);
    this.coursesListChanged.next(this.courses.slice());
  }

  editCourse(id: number, course: Course) {
    let index = this.findCourseIndexById(id);
    course.id = id;
    this.courses[index] = course;

    this.coursesListChanged.next(this.courses.slice());
  }

  removeCourse(id: number) {
    let index = this.findCourseIndexById(id);
    this.courses.splice(index, 1);

    this.coursesListChanged.next(this.courses.slice());
  }

  private findCourseIndexById(id: number) {
    return this.courses.findIndex(s => s.id === id)
  }
  
  private getNextId(): number {
    const maxId = this.courses.reduce((prev, curr) => Math.max(prev, curr.id), 0);
    return maxId + 1;
  }
}
