import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from '../models/student.model';
import { DataAccessService } from './data-access.service';
import { InscriptionsService } from './inscriptions.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentListChanged = new Subject<Student[]>();
  public studentListChanged$ = this.studentListChanged.asObservable();

  constructor(
    private readonly _dataAccess: DataAccessService,
    private readonly _inscriptionsService: InscriptionsService
  ) { }

  getStudents(): Student[] {
    return this._dataAccess.students.slice();
  }

  addStudent(student: Student) {
    student.id = this.getNextId();
    this._dataAccess.students.push(student);
    this.studentListChanged.next(this._dataAccess.students.slice());
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

  private findStudentIndexById(id: number) {
    return this._dataAccess.students.findIndex(s => s.id === id)
  }
  
  private getNextId(): number {
    const maxId = this._dataAccess.students.reduce((prev, curr) => Math.max(prev, curr.id), 0);
    return maxId + 1;
  }
}
