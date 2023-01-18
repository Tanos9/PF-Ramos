import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/courses.model';
import { Student } from '../models/student.model';
import { DataAccessService } from './data-access.service';
import { InscriptionsService } from './inscriptions.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  public students$: Observable<Student[]>;
  
  constructor(
    private readonly _inscriptionsService: InscriptionsService,
    private readonly _dataAccess: DataAccessService
  )
 {
    this.students$ = this._dataAccess.students$;
 }

  addStudent(student: Student) {
    this._dataAccess.addStudentFromAPI(student);
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
}
