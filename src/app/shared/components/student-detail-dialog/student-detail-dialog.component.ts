import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/courses.model';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-detail-dialog',
  templateUrl: './student-detail-dialog.component.html',
  styleUrls: ['./student-detail-dialog.component.scss']
})
export class StudentDetailDialogComponent {

  courses: Course[] = []; 
  student!: Student;

  constructor(
    public dialogRef: MatDialogRef<StudentDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.courses = this.data.courses;
    this.student = this.data.student;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
