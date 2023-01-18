import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Course } from '../models/courses.model';
import { Inscription, InscriptionData } from '../models/inscription.model';
import { Student } from '../models/student.model';
import { DataAccessService } from './data-access.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private readonly URL = 'https://63c82b395c0760f69ac6c335.mockapi.io/';

  private inscriptions = new BehaviorSubject<Inscription[]>([]);
  public inscriptions$: Observable<Inscription[]>;

  constructor (
    private readonly _dataAccess: DataAccessService,
    private _httpClient: HttpClient
  ) 
  {
    this.inscriptions$ = this.inscriptions.asObservable();
    this.getInscriptionsFromAPI().subscribe(inscriptions => {
      this.inscriptions.next(inscriptions);
    });
  }

  getInscriptions() : InscriptionData [] {
    let inscriptionData : InscriptionData[] = [];
    let inscriptionsFromApi : Inscription[] = [];
    this.getInscriptionsFromAPI().subscribe(inscriptions => {
      inscriptionsFromApi = inscriptions;
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
    let student = this._dataAccess.students.find(s => s.id === id);
    return student ? student.firstName + " " + student.lastName : ''
  }

  getCourseNameById(id: number){
    let course = this._dataAccess.courses.find(s => s.id === id);
    return course ? course.name : ''  }

  addInscription(inscription: Inscription) {
    inscription.id = this.getNextId();
    this._dataAccess.inscriptions.push(inscription);
    this.inscriptions.next(this._dataAccess.inscriptions.slice());
    console.log(this._dataAccess.inscriptions)
  }

  editInscription(id: number, inscription: Inscription) {
    let index = this.findInscriptionIndexById(id);
    inscription.id = id;
    this._dataAccess.inscriptions[index] = inscription;

    this.inscriptions.next(this._dataAccess.inscriptions.slice());
  }

  removeInscription(id: number) {
    let index = this.findInscriptionIndexById(id);
    this._dataAccess.inscriptions.splice(index, 1);

    this.inscriptions.next(this._dataAccess.inscriptions.slice());
  }

  removeInscriptionsByCourseId(courseId: number){
    this._dataAccess.inscriptions = this._dataAccess.inscriptions.filter(i => i.courseId !== courseId)
    this.inscriptions.next(this._dataAccess.inscriptions.slice());
  }

  removeInscriptionsByStudentId(studentId: number){
    this._dataAccess.inscriptions = this._dataAccess.inscriptions.filter(i => i.studentId !== studentId)
    this.inscriptions.next(this._dataAccess.inscriptions.slice());
  }

  removeSingleInscription(studentId: number, courseId: number){
    this._dataAccess.inscriptions = this._dataAccess.inscriptions.
      filter(i => i.studentId !== studentId || i.courseId !== courseId)
    this.inscriptions.next(this._dataAccess.inscriptions.slice());
  }

  getInscribedCoursesByStudentId(studentId: number): Course[] {
    return this._dataAccess.inscriptions
      .filter((inscription) => inscription.studentId === studentId)
      .map((inscription) => this._dataAccess.courses
        .find((course) => course.id === inscription.courseId))
      .filter((course): course is Course => !!course);
  }

  getInscribedStudentsByCourseId(courseId: number): Student[] {
    return this._dataAccess.inscriptions
      .filter((inscription) => inscription.courseId === courseId)
      .map((inscription) => this._dataAccess.students
        .find((student) => student.id === inscription.studentId))
      .filter((student): student is Student => !!student);
  }

  getAvailableCoursesByStudentId(studentId: number): Course[]{
    const inscribedCoursesId = this._dataAccess.inscriptions
      .filter((inscription) => inscription.studentId === studentId)
      .map((inscription) => inscription.courseId);
    return this._dataAccess.courses
      .filter((course) => !inscribedCoursesId.includes(course.id));
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

  //Inscriptions
  
  getInscriptionsFromAPI() : Observable<Inscription[]>{
    return this._httpClient.get<Inscription[]>(`${this.URL}inscriptions`)
  }

  addInscriptionsFromAPI(course: Inscription) {
    return this._httpClient.post(`${this.URL}inscriptions`, course).subscribe(_ => {
      this.refreshInscriptionsList();
    });
  }

  editInscriptionsFromAPI(course: Inscription): void {
    this._httpClient.put(`${this.URL}inscriptions/${course.id}`, course).subscribe(_ => {
      this.refreshInscriptionsList();
    });
  }

  deleteInscriptionsFromAPI(id: number): void {
    this._httpClient.delete(`${this.URL}inscriptions/${id}`).subscribe(_ => {
      this.refreshInscriptionsList();
    });
  }

  refreshInscriptionsList() {
    this.getInscriptionsFromAPI().subscribe(students => {
      this.inscriptions.next(students);
    })
  }
}
