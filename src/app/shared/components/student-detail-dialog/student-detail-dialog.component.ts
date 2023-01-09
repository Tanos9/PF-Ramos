import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/courses.model';
import { Student } from 'src/app/models/student.model';
import { InscriptionsService } from 'src/app/services/inscriptions.service';

@Component({
  selector: 'app-student-detail-dialog',
  templateUrl: './student-detail-dialog.component.html',
  styleUrls: ['./student-detail-dialog.component.scss']
})
export class StudentDetailDialogComponent {

  courses: Course[] = []; 
  student!: Student;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<StudentDetailDialogComponent>,
    private readonly _inscriptionService: InscriptionsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.courses = this.data.courses;
    this.student = this.data.student;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(StudentDetailDialogComponent);
  }

  removeInscription(studentId: number, courseId: number, index: number){
    this._inscriptionService.removeSingleInscription(studentId, courseId);
    this.courses.splice(index, 1);
  }
}
