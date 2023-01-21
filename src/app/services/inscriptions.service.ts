import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Course } from '../models/courses.model';
import { Inscription, InscriptionData } from '../models/inscription.model';
import { Student } from '../models/student.model';
import { DataAccessService } from './data-access.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  public inscriptions$: Observable<Inscription[]>;

  constructor (
    private readonly _dataAccess: DataAccessService,
  ) 
  {
    this.inscriptions$ = this._dataAccess.inscriptions$;
  }

  getInscriptions() : InscriptionData [] {
    let inscriptionData : InscriptionData[] = [];
    let inscriptionsFromApi : Inscription[] = [];
    this.inscriptions$.pipe(first()).subscribe(sus => {
      inscriptionsFromApi = sus
    });
    inscriptionsFromApi.forEach(element => {
      inscriptionData.push(
        new InscriptionData(
          element.id,
          this.getStudentNameById(element.studentId),
          this.getCourseNameById(element.courseId))
      )
    })
    
    return inscriptionData;
  }


  getStudentNameById(id: number){
    let student = this._dataAccess.getStudents().find(s => s.id === id);
    return student ? student.firstName + " " + student.lastName : ''
  }

  getCourseNameById(id: number){
    let course = this._dataAccess.getCourses().find(s => s.id === id);
    return course ? course.name : ''  }


  addInscription(inscription: Inscription) {
    this._dataAccess.addInscriptionsFromAPI(inscription);
  }

  editInscription(id: number, inscription: Inscription) {
    this._dataAccess.editInscriptionsFromAPI(inscription);
  }

  removeInscription(id: number) {
    this._dataAccess.deleteInscriptionsFromAPI(id);
  }

  getInscribedCoursesByStudentId(studentId: number): Course[] {
    return this._dataAccess.getInscriptions()
      .filter((inscription) => inscription.studentId == studentId)
      .map((inscription) => this._dataAccess.getCourses()
        .find((course) => course.id === inscription.courseId))
      .filter((course): course is Course => !!course);
  }

  getInscribedStudentsByCourseId(courseId: number): Student[] {
    return this._dataAccess.getInscriptions()
      .filter((inscription) => inscription.courseId == courseId)
      .map((inscription) => this._dataAccess.getStudents()
        .find((student) => student.id === inscription.studentId))
      .filter((student): student is Student => !!student);
  }

  removeInscriptionsByCourseId(courseId: number){
    this._dataAccess.removeInscriptionsByCourseId(courseId);
  }

  removeInscriptionsByStudentId(studentId: number){
    this._dataAccess.removeInscriptionsByStudentId(studentId);
  }

  removeSingleInscription(studentId: number, courseId: number){
    let inscription = this._dataAccess.getInscriptions()
    .find(i => i.studentId == studentId && i.courseId == courseId)
    this._dataAccess.deleteInscriptionsFromAPI(inscription!.id);
  }

  getAvailableCoursesByStudentId(studentId: number): Course[]{
    const inscribedCoursesId = this._dataAccess.getInscriptions()
      .filter((inscription) => inscription.studentId === studentId)
      .map((inscription) => inscription.courseId);
    return this._dataAccess.getCourses()
      .filter((course) => !inscribedCoursesId.includes(course.id));
  }

  getStudents(): Student[]{
    return this._dataAccess.getStudents();
  }

  getCourses(): Course[]{
    return this._dataAccess.getCourses();
  }
}