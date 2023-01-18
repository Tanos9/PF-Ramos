import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/courses.model';
import { Inscription } from '../models/inscription.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private readonly URL = 'https://63c7156edcdc478e15cf23bb.mockapi.io/';

  private studentsObs = new BehaviorSubject<Student[]>([]);
  public students$: Observable<Student[]>;
  private coursesObs = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]>;

  public students: Student[] = [
    {id: 1, firstName: 'Andrea', lastName: 'Falco', email: 'falquicius@gmail.com'},
    {id: 2, firstName: 'John', lastName: 'Dude', email: 'thedood@outlook.com'},
    {id: 3, firstName: 'Mike', lastName: 'Portnoy', email: 'drumguy@gmail.com'},
  ]

  public courses: Course[] = [
    new Course(1, 'Matematica 1', 'Aplicación de Cálculo Matemático'),
    new Course(2, 'Física 1', 'Aplicación de Física Clásica'),
    new Course(3, 'Quimica 1', 'Química orgánica')
  ]

  public inscriptions: Inscription[] = [
    new Inscription(1, 1, 1)
  ]

  constructor(private _httpClient: HttpClient
    ) {
      this.students$ = this.studentsObs.asObservable();
      this.getStudentsFromAPI().subscribe(students => {
        this.studentsObs.next(students);
      });
      this.courses$ = this.coursesObs.asObservable();
      this.getCoursesFromAPI().subscribe(courses => {
        this.coursesObs.next(courses);
      });
  }
  
  //Students

  getStudentsFromAPI() : Observable<Student[]>{
    return this._httpClient.get<Student[]>(`${this.URL}students`)
  }

  addStudentFromAPI(student: Student) {
    return this._httpClient.post(`${this.URL}students`, student).subscribe(_ => {
      this.refreshStudentsList();
    });
  }

  editStudentFromAPI(student: Student): void {
    this._httpClient.put(`${this.URL}students/${student.id}`, student).subscribe(_ => {
      this.refreshStudentsList();
    });
  }

  deleteStudentFromAPI(id: number): void {
    this._httpClient.delete(`${this.URL}students/${id}`).subscribe(_ => {
      this.refreshStudentsList();
    });
  }

  refreshStudentsList() {
    this.getStudentsFromAPI().subscribe(students => {
      this.studentsObs.next(students);
    })
  }

  //Courses

  getCoursesFromAPI() : Observable<Course[]>{
    return this._httpClient.get<Course[]>(`${this.URL}courses`)
  }

  addCourseFromAPI(course: Course) {
    return this._httpClient.post(`${this.URL}courses`, course).subscribe(_ => {
      this.refreshCoursesList();
    });
  }

  editCourseFromAPI(course: Course): void {
    this._httpClient.put(`${this.URL}courses/${course.id}`, course).subscribe(_ => {
      this.refreshCoursesList();
    });
  }

  deleteCourseFromAPI(id: number): void {
    this._httpClient.delete(`${this.URL}courses/${id}`).subscribe(_ => {
      this.refreshCoursesList();
    });
  }

  refreshCoursesList() {
    this.getCoursesFromAPI().subscribe(courses => {
      this.coursesObs.next(courses);
    })
  }
}
