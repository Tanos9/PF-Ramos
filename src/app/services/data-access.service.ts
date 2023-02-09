import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, find, map, mergeAll, Observable, of } from 'rxjs';
import { Course } from '../models/courses.model';
import { Inscription } from '../models/inscription.model';
import { Student } from '../models/student.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private readonly students_courses_URL = 'https://63c7156edcdc478e15cf23bb.mockapi.io/';
  private readonly users_inscriptions_URL = 'https://63c82b395c0760f69ac6c335.mockapi.io/';

  private studentsObs = new BehaviorSubject<Student[]>([]);
  public students$: Observable<Student[]>;
  private coursesObs = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]>;
  private inscriptionsObs = new BehaviorSubject<Inscription[]>([]);
  public inscriptions$: Observable<Inscription[]>;
  private usersObs = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]>;

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
      this.users$ = this.usersObs.asObservable();
      this.getUsersFromAPI().subscribe(users => {
        this.usersObs.next(users);
      });
  }
  
  //Students

  getStudentsFromAPI() : Observable<Student[]>{
    return this._httpClient.get<Student[]>(`${this.students_courses_URL}students`)
  }

  getStudentById(id: number) : Observable<Student>{
    return this._httpClient.get<Student>(`${this.students_courses_URL}students/${id}`)
  }

  addStudentFromAPI(student: Student) {
    return this._httpClient.post(`${this.students_courses_URL}students`, student).subscribe(_ => {
      this.refreshStudentsList();
    });
  }

  editStudentFromAPI(student: Student): void {
    this._httpClient.put(`${this.students_courses_URL}students/${student.id}`, student).subscribe(_ => {
      this.refreshStudentsList();
    });
  }

  deleteStudentFromAPI(id: number): void {
    this._httpClient.delete(`${this.students_courses_URL}students/${id}`).subscribe(_ => {
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
    return this._httpClient.get<Course[]>(`${this.students_courses_URL}courses`)
  }

  getCourseById(id: number) : Observable<Course>{
    return this._httpClient.get<Course>(`${this.students_courses_URL}courses/${id}`)
  }

  addCourseFromAPI(course: Course) {
    return this._httpClient.post(`${this.students_courses_URL}courses`, course).subscribe(_ => {
      this.refreshCoursesList();
    });
  }

  editCourseFromAPI(course: Course): void {
    this._httpClient.put(`${this.students_courses_URL}courses/${course.id}`, course).subscribe(_ => {
      this.refreshCoursesList();
    });
  }

  deleteCourseFromAPI(id: number): void {
    this._httpClient.delete(`${this.students_courses_URL}courses/${id}`).subscribe(_ => {
      this.refreshCoursesList();
    });
  }

  refreshCoursesList() {
    this.getCoursesFromAPI().subscribe(courses => {
      this.coursesObs.next(courses);
    })
  }

  //Users

  getUsersFromAPI() : Observable<User[]>{
    return this._httpClient.get<User[]>(`${this.users_inscriptions_URL}users`)
  }

  addUserFromAPI(user: User) {
    return this._httpClient.post(`${this.users_inscriptions_URL}users`, user).subscribe(_ => {
      this.refreshUsersList();
    });
  }

  editUserFromAPI(user: User): void {
    this._httpClient.put(`${this.users_inscriptions_URL}users/${user.id}`, user).subscribe(_ => {
      this.refreshUsersList();
    });
  }

  deleteUserFromAPI(id: number): void {
    this._httpClient.delete(`${this.users_inscriptions_URL}users/${id}`).subscribe(_ => {
      this.refreshUsersList();
    });
  }

  refreshUsersList() {
    this.getUsersFromAPI().subscribe(users => {
      this.usersObs.next(users);
    })
  }

    //Inscriptions
  
    getInscriptionsFromAPI() : Observable<Inscription[]>{
      return this._httpClient.get<Inscription[]>(`${this.users_inscriptions_URL}inscriptions`)
    }
  
    addInscriptionsFromAPI(course: Inscription) {
      return this._httpClient.post(`${this.users_inscriptions_URL}inscriptions`, course).subscribe(_ => {
        this.refreshInscriptionsList();
      });
    }
  
    editInscriptionsFromAPI(course: Inscription): void {
      this._httpClient.put(`${this.users_inscriptions_URL}inscriptions/${course.id}`, course).subscribe(_ => {
        this.refreshInscriptionsList();
      });
    }
  
    deleteInscriptionsFromAPI(id: number): void {
      this._httpClient.delete(`${this.users_inscriptions_URL}inscriptions/${id}`).subscribe(_ => {
        this.refreshInscriptionsList();
      });
    }
  
    refreshInscriptionsList() {
      this.getInscriptionsFromAPI().subscribe(students => {
        this.inscriptionsObs.next(students);
      })
    }

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

  getUsers(): User[] {
    let users: User[] = [];
    this.users$.subscribe(i => users = i);
    return users;
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
