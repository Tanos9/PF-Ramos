import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Course } from '../models/courses.model';
import { Inscription } from '../models/inscription.model';
import { Student } from '../models/student.model';
import { DataAccessService } from './data-access.service';
import { InscriptionsService } from './inscriptions.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentListChanged = new Subject<Student[]>();
  public studentListChanged$ = this.studentListChanged.asObservable();
  public student$: Observable<Student[]>;

  constructor(
    private readonly _dataAccess: DataAccessService,
    private readonly _inscriptionsService: InscriptionsService
  ) {
    this.student$ = this._dataAccess.students$
   }

  getStudents() {
    return this._dataAccess.getStudentsFromAPI();
  }

  addStudent(student: Student) {
    this._dataAccess.addStudentFromAPI(student);
    this.student$.subscribe(_ => this._dataAccess.refreshStudents());
  }

  editStudent(id: number, student: Student) {
    let index = this.findStudentIndexById(id);
    student.id = id;
    this._dataAccess.students[index] = student;

    this.studentListChanged.next(this._dataAccess.students.slice());
  }

  removeStudent(id: number) {
    this._inscriptionsService.removeInscriptionsByStudentId(id);
    
    let index = this.findStudentIndexById(id);
    this._dataAccess.students.splice(index, 1);

    this.studentListChanged.next(this._dataAccess.students.slice());
  }
  
  getInscribedCoursesByStudentId(studentId: number): Course[]{
    return this._inscriptionsService.getInscribedCoursesByStudentId(studentId);
  }

  getStudentById(studentId: number) {
    return this._dataAccess.students.find(s => s.id === studentId);
  }

  private findStudentIndexById(id: number) {
    return this._dataAccess.students.findIndex(s => s.id === id)
  }
  
  private getNextId(): number {
    const maxId = this._dataAccess.students.reduce((prev, curr) => Math.max(prev, curr.id), 0);
    return maxId + 1;
  }
}
