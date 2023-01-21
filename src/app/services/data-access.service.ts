import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, find, map, mergeAll, Observable, of } from 'rxjs';
import { Course } from '../models/courses.model';
import { Inscription } from '../models/inscription.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private readonly URL = 'https://63c7156edcdc478e15cf23bb.mockapi.io/';
  private readonly inscriptionsURL = 'https://63c82b395c0760f69ac6c335.mockapi.io/';

  private studentsObs = new BehaviorSubject<Student[]>([]);
  public students$: Observable<Student[]>;
  private coursesObs = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]>;
  private inscriptionsObs = new BehaviorSubject<Inscription[]>([]);
  public inscriptions$: Observable<Inscription[]>;

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
      this.inscriptions$ = this.inscriptionsObs.asObservable();
      this.getInscriptionsFromAPI().subscribe(inscriptions => {
        this.inscriptionsObs.next(inscriptions);
      });
  }
  
  //Students

  getStudentsFromAPI() : Observable<Student[]>{
    return this._httpClient.get<Student[]>(`${this.URL}students`)
  }

  getStudentById(id: number) : Observable<Student>{
    return this._httpClient.get<Student>(`${this.URL}students/${id}`)
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

  getCourseById(id: number) : Observable<Course>{
    return this._httpClient.get<Course>(`${this.URL}courses/${id}`)
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

  
  //Inscriptions
  
  getInscriptionsFromAPI() : Observable<Inscription[]>{
    return this._httpClient.get<Inscription[]>(`${this.inscriptionsURL}inscriptions`)
  }

  addInscriptionsFromAPI(course: Inscription) {
    return this._httpClient.post(`${this.inscriptionsURL}inscriptions`, course).subscribe(_ => {
      this.refreshInscriptionsList();
    });
  }

  editInscriptionsFromAPI(course: Inscription): void {
    this._httpClient.put(`${this.inscriptionsURL}inscriptions/${course.id}`, course).subscribe(_ => {
      this.refreshInscriptionsList();
    });
  }

  deleteInscriptionsFromAPI(id: number): void {
    this._httpClient.delete(`${this.inscriptionsURL}inscriptions/${id}`).subscribe(_ => {
      this.refreshInscriptionsList();
    });
  }

  refreshInscriptionsList() {
    this.getInscriptionsFromAPI().subscribe(students => {
      this.inscriptionsObs.next(students);
    })
  }

  //Get from observables
  getCourses(): Course[] {
    let courses: Course[] = [];
    this.courses$.subscribe(c => courses = c);
    return courses;
  }

  getStudents(): Student[] {
    let students: Student[] = [];
    this.students$.subscribe(c => students = c);
    return students;
  }

  getInscriptions(): Inscription[] {
    let inscriptions: Inscription[] = [];
    this.inscriptions$.subscribe(i => inscriptions = i);
    return inscriptions;
  }

  //Set Observables
  updateCourses(courses: Course[]): void {
    this.courses$ = of(courses);
  }

  updateInscriptions(inscriptions: Inscription[]): void {
    this.inscriptions$ = of(inscriptions);
  }

  removeInscriptionsByCourseId(courseId: number) {
    this.inscriptions$.pipe(
        map(inscriptions => inscriptions.filter(inscription => inscription.courseId == courseId)),
        filter(inscriptions => inscriptions.length > 0)
    )
    .subscribe(inscriptions => {
        inscriptions.forEach(inscription => {
            this.deleteInscriptionsFromAPI(inscription.id);
        });
    });
  }

  removeInscriptionsByStudentId(studentId: number) {
    this.inscriptions$.pipe(
        map(inscriptions => inscriptions.filter(inscription => inscription.studentId == studentId)),
        filter(inscriptions => inscriptions.length > 0)
    )
    .subscribe(inscriptions => {
        inscriptions.forEach(inscription => {
            this.deleteInscriptionsFromAPI(inscription.id);
        });
    });
  }

  removeSingleInscription(studentId: number, courseId: number) {
    this.inscriptions$.pipe(
        map(inscriptions => inscriptions.find( i => i.studentId !== studentId || i.courseId !== courseId)),
    )
    .subscribe(inscription => {
      this.deleteInscriptionsFromAPI(inscription!.id);
    });
  }  

//   getInscribedStudentsByCourseId(courseId: number){
//     return this.inscriptions$.pipe(
//       map(inscriptions => 
//         inscriptions.filter((inscription) => inscription.courseId === courseId)
//           .map(inscription => this.students$.pipe(
//             map(students => students.find((student) => student.id === inscription.studentId))
//           )))
//     ).subscribe();
//   }
  getInscribedStudentsByCourseId(courseId: number): Student[] {
    let students: Student[] = [];
    this.inscriptions$.pipe(
      map(inscriptions => 
        inscriptions.filter((inscription) => inscription.courseId == courseId)
          .map(inscription => this.students$.pipe(
            map(allStudents => allStudents.filter((student) => student.id !== inscription.studentId)),
          ))),
      mergeAll(),
      mergeAll()
    ).subscribe(s => students = s);
    return students;
}


}
