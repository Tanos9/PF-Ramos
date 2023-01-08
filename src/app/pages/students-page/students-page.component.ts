import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { StudentDialogComponent } from 'src/app/shared/components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  students: Student[] = [];

  displayedColumns = ['id', 'name', 'career', 'email', 'edit', 'delete'];

  constructor(
    private readonly _dialogService: MatDialog,
    public _studentsService : StudentsService
  )
  {
    this._studentsService.studentListChanged$.subscribe(() => {
      this.students = _studentsService.getStudents();
    });
  }
  
  ngOnInit(){
    this.students = this._studentsService.getStudents();
  }

  addStudent() {
    const dialog = this._dialogService.open(StudentDialogComponent)

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this._studentsService.addStudent(value);
      }
    })
  }

  removeStudent(student: Student) {
    this._studentsService.removeStudent(student.id)
  }

  editStudent(student: Student) {
    const dialog = this._dialogService.open(StudentDialogComponent,
    {
      data: student,
    })

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this._studentsService.editStudent(student.id, data);
      }
    })
  }
}
