import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Course } from '../models/courses.model';
import { Inscription } from '../models/inscription.model';
import { Student } from '../models/student.model';
import { DataAccessService } from './data-access.service';
import { InscriptionsService } from './inscriptions.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private readonly studentApiURL = 'https://63c7156edcdc478e15cf23bb.mockapi.io/';
  private students = new BehaviorSubject<Student[]>([]);
  public students$: Observable<Student[]>;
  
  constructor(
    private _httpClient: HttpClient,
    private readonly _inscriptionsService: InscriptionsService,
    private readonly _dataAccess: DataAccessService
  )
 {
    this.students$ = this.students.asObservable();
    this.getStudentsFromAPI().subscribe(students => {
      this.students.next(students);
    });
 }

  getStudents() {
    return this.getStudentsFromAPI();
  }

  addStudent(student: Student) {
    this.addStudentFromAPI(student);
    // this.students$.subscribe(_ => this._dataAccess.refreshStudents());
  }

  editStudent(id: number, student: Student) {
    student.id = id;
    this._dataAccess.editStudentFromAPI(student);
  }

  removeStudent(id: number) {
    this._inscriptionsService.removeInscriptionsByStudentId(id);    
    this._dataAccess.deleteStudentFromAPI(id);
  }
  
  getInscribedCoursesByStudentId(studentId: number): Course[]{
    return this._inscriptionsService.getInscribedCoursesByStudentId(studentId);
  }

  getStudentById(studentId: number) {
    return this._dataAccess.students.find(s => s.id === studentId);
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
      
    });
  }

  deleteStudentFromAPI(id: number): void {
    this._httpClient.delete(`${this.studentApiURL}students/${id}`).subscribe(_ => {
      
    });
  }

  
  refreshStudents() {
    this.getStudentsFromAPI().subscribe(students => {
      this.students.next(students);
    })
  }

}
