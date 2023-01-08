import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students: Student[] = [
    new Student(1, 'Andrea', 'Falco', 'falquicius@gmail.com', 'Ingeniería Industrial'),
    new Student(2, 'John', 'Dude', 'thedood@outlook.com', 'Ingeniería Civil'),
    new Student(3, 'Mike', 'Portnoy', 'drumguy@gmail.com', "Ingeniería en Software"),
  ]

  private studentListChanged = new Subject<Student[]>();
  public studentListChanged$ = this.studentListChanged.asObservable();

  constructor() { }

  getStudents(): Student[] {
    return this.students.slice();
  }

  addStudent(student: Student) {
    student.id = this.getNextId();
    this.students.push(student);
    this.studentListChanged.next(this.students.slice());
  }

  editStudent(id: number, student: Student) {
    let index = this.findStudentIndexById(id);
    student.id = id;
    this.students[index] = student;

    this.studentListChanged.next(this.students.slice());
  }

  removeStudent(id: number) {
    let index = this.findStudentIndexById(id);
    this.students.splice(index, 1);

    this.studentListChanged.next(this.students.slice());
  }

  private findStudentIndexById(id: number) {
    return this.students.findIndex(s => s.id === id)
  }
  
  private getNextId(): number {
    const maxId = this.students.reduce((prev, curr) => Math.max(prev, curr.id), 0);
    return maxId + 1;
  }
}
