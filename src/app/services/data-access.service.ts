import { Injectable } from '@angular/core';
import { Course } from '../models/courses.model';
import { Inscription } from '../models/inscription.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  public students: Student[] = [
    new Student(1, 'Andrea', 'Falco', 'falquicius@gmail.com'),
    new Student(2, 'John', 'Dude', 'thedood@outlook.com'),
    new Student(3, 'Mike', 'Portnoy', 'drumguy@gmail.com'),
  ]

  public courses: Course[] = [
    new Course(1, 'Matematica 1', 'Aplicación de Cálculo Matemático'),
    new Course(2, 'Física 1', 'Aplicación de Física Clásica'),
    new Course(3, 'Quimica 1', 'Química orgánica')
  ]

  public inscriptions: Inscription[] = [
    new Inscription(1, 1, 1)
  ]

  constructor() { }

}
