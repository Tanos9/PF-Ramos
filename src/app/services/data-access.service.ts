import { Injectable } from '@angular/core';
import { Course } from '../models/courses.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  public students: Student[] = [
    new Student(1, 'Andrea', 'Falco', 'falquicius@gmail.com', 'Ingeniería Industrial'),
    new Student(2, 'John', 'Dude', 'thedood@outlook.com', 'Ingeniería Civil'),
    new Student(3, 'Mike', 'Portnoy', 'drumguy@gmail.com', "Ingeniería en Software"),
  ]

  public courses: Course[] = [
    new Course(1, 'Matematica 1', 'Calculo Matemático'),
    new Course(2, 'Física 1', 'Fisica clásica'),
    new Course(3, 'Ingeniería y Sociedad', 'Ingeniería en la sociedad actual')
  ]

  constructor() { }

}
