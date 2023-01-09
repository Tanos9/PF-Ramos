import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from '../models/courses.model';
import { Inscription, InscriptionData } from '../models/inscription.model';
import { Student } from '../models/student.model';
import { DataAccessService } from './data-access.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private inscriptionListChanged = new Subject<Inscription[]>();
  public inscriptionListChanged$ = this.inscriptionListChanged.asObservable();

  constructor(private readonly _dataAccess: DataAccessService) { }

  getInscriptions() : InscriptionData [] {
    let inscriptionData : InscriptionData[] = [];
    this._dataAccess.inscriptions.forEach(element => {
      inscriptionData.push(
        new InscriptionData(
          element.id,
          this.getStudentNameById(element.studentId),
          this.getCourseNameById(element.courseId))
      )
    });
    return inscriptionData;
  }

  getStudentNameById(id: number){
    let student = this._dataAccess.students.find(s => s.id === id);
    return student ? student.firstName + " " + student.lastName : ''
  }

  getCourseNameById(id: number){
    let course = this._dataAccess.courses.find(s => s.id === id);
    return course ? course.name : ''  }

  addInscription(inscription: Inscription) {
    inscription.id = this.getNextId();
    this._dataAccess.inscriptions.push(inscription);
    this.inscriptionListChanged.next(this._dataAccess.inscriptions.slice());
    console.log(this._dataAccess.inscriptions)
  }

  editInscription(id: number, inscription: Inscription) {
    let index = this.findInscriptionIndexById(id);
    inscription.id = id;
    this._dataAccess.inscriptions[index] = inscription;

    this.inscriptionListChanged.next(this._dataAccess.inscriptions.slice());
  }

  removeInscription(id: number) {
    let index = this.findInscriptionIndexById(id);
    this._dataAccess.inscriptions.splice(index, 1);

    this.inscriptionListChanged.next(this._dataAccess.inscriptions.slice());
  }

  removeInscriptionsByCourseId(courseId: number){
    this._dataAccess.inscriptions = this._dataAccess.inscriptions.filter(i => i.courseId != courseId)
    this.inscriptionListChanged.next(this._dataAccess.inscriptions.slice());
  }

  removeInscriptionsByStudentId(studentId: number){
    this._dataAccess.inscriptions = this._dataAccess.inscriptions.filter(i => i.studentId != studentId)
    this.inscriptionListChanged.next(this._dataAccess.inscriptions.slice());
  }

  removeSingleInscription(studentId: number, courseId: number){
    this._dataAccess.inscriptions = this._dataAccess.inscriptions.
      filter(i => i.studentId != studentId && i.courseId != courseId)
    this.inscriptionListChanged.next(this._dataAccess.inscriptions.slice());
  }

  getInscribedCoursesByStudentId(studentId: number): Course[] {
    return this._dataAccess.inscriptions
      .filter((inscription) => inscription.studentId === studentId)
      .map((inscription) => this._dataAccess.courses.find((course) => course.id === inscription.courseId))
      .filter((course): course is Course => !!course);
  }

  getInscribedStudentsByCourseId(courseId: number): Student[] {
    return this._dataAccess.inscriptions
      .filter((inscription) => inscription.courseId === courseId)
      .map((inscription) => this._dataAccess.students.find((student) => student.id === inscription.studentId))
      .filter((student): student is Student => !!student);
  }

  getStudents(): Student[]{
    return this._dataAccess.students;
  }

  getCourses(): Course[]{
    return this._dataAccess.courses;
  }

  private findInscriptionIndexById(id: number) {
    return this._dataAccess.inscriptions.findIndex(i => i.id === id)
  }
  
  private getNextId(): number {
    const maxId = this._dataAccess.inscriptions.reduce((prev, curr) => Math.max(prev, curr.id), 0);
    return maxId + 1;
  }
}
