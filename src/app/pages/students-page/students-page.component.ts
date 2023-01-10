import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/courses.model';
import { Student } from 'src/app/models/student.model';
import { StudentsService } from 'src/app/services/students.service';
import { DeleteAlertDialogComponent } from 'src/app/shared/components/delete-alert-dialog/delete-alert-dialog/delete-alert-dialog.component';
import { StudentDetailDialogComponent } from 'src/app/shared/components/student-detail-dialog/student-detail-dialog.component';
import { StudentDialogComponent } from 'src/app/shared/components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  students: Student[] = [];
  private readonly customDeleteTitle = "Confirma eliminar este alumno?";
  private readonly customDeleteDetail = "Se eliminaran todos sus datos y las inscripciones a los cursos";

  displayedColumns = ['id', 'name', 'career', 'email', 'details', 'edit', 'delete'];

  constructor(
    private readonly _dialogService: MatDialog,
    public _studentsService: StudentsService
  )
  {
    this._studentsService.studentListChanged$.subscribe(() => {
      this.students = _studentsService.getStudents();
    });
  }
  
  ngOnInit(){
    this.students = this._studentsService.getStudents();
  }

  viewStudentDetails(studentId: number) {
    let student = this._studentsService.getStudentById(studentId);
    let courses = this.getInscribedCoursesByStudentId(studentId);
    const dialogRef = this._dialogService.open(StudentDetailDialogComponent, {
      width: '250px',
      data: {
        courses: courses,
        student: student
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

  getInscribedCoursesByStudentId(studentId: number): Course[]{
    return this._studentsService.getInscribedCoursesByStudentId(studentId);
  }

  openDeleteDialog(student: Student): void {
    const dialogRef = this._dialogService.open(DeleteAlertDialogComponent,
      {
        data: {
          customTitle: this.customDeleteTitle,
          customDetail: this.customDeleteDetail
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeStudent(student);
      }
   });
 }
}

