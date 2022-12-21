import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentDialogComponent } from 'src/app/shared/components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  students: Student[] = [
    new Student(1, 'Andrea', 'Falco', 'falquicius@gmail.com'),
    new Student(2, 'John', 'Dude', 'thedood@outlook.com'),
    new Student(3, 'Mike', 'Portnoy', 'drumguy@gmail.com'),
  ]

  displayedColumns = ['id', 'name', 'email', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog) {}

  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent)

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        const lastId = this.students[this.students.length - 1]?.id;
        this.students = [...this.students, new Student(lastId + 1, value.firstName, value.lastName, value.email)];
      }
    })
  }

  removeStudent(student: Student) {
    this.students = this.students.filter(
      (stu) => stu.id !== student.id
    );
  }

  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: student,
    })

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.students = this.students.map((stu) => stu.id === student.id ? { ...stu, ...data } : stu)
      }
    })
  }
}
