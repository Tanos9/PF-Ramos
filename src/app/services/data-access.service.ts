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

  private readonly studentApiURL = 'https://63c7156edcdc478e15cf23bb.mockapi.io/';
  private studentsAPI = new BehaviorSubject<Student[]>([]);
  public students$: Observable<Student[]>;


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

  constructor(private _httpClient: HttpClient) {
    this.students$ = this.studentsAPI.asObservable();

    this.getStudentsFromAPI().subscribe(prod => {
      this.studentsAPI.next(prod)
   });
  }

  getStudentsFromAPI() : Observable<Student[]>{
    return this._httpClient.get<Student[]>(`${this.studentApiURL}students`)
  }

  addStudentFromAPI(student: Student) {
    return this._httpClient.post(`${this.studentApiURL}students`, student).subscribe(_ => {
      this.refreshStudents();
    });
  }

  editStudentFromAPI(student: Student): void {
    this._httpClient.put(`${this.studentApiURL}students/${student.id}`, student).subscribe(_ => {
      this.refreshStudents();
    });
  }

  deleteStudentFromAPI(id: number): void {
    this._httpClient.delete(`${this.studentApiURL}students/${id}`).subscribe(_ => {
      
    });
  }

  refreshStudents() {
    this.getStudentsFromAPI().subscribe(students => {
      this.studentsAPI.next(students);
    })
  }

  // getStudents(): Observable<Student[]> {
  //   this.getStudentsFromAPI().subscribe(studentsFromApi => {
  //     this.students = studentsFromApi
  //     console.log("Students from api:")
  //     console.log(studentsFromApi)
  //     console.log("Current students list:")
  //     console.log(this.students)
  //   })
  //   return this.students
  // }
}
