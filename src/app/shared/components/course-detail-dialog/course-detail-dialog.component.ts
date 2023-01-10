import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/courses.model';
import { Student } from 'src/app/models/student.model';
import { InscriptionsService } from 'src/app/services/inscriptions.service';

@Component({
  selector: 'app-course-detail-dialog',
  templateUrl: './course-detail-dialog.component.html',
  styleUrls: ['./course-detail-dialog.component.scss']
})
export class CourseDetailDialogComponent {
  students: Student[] = []; 
  course!: Course;

  constructor(
    private dialog: MatDialog,
    private readonly _inscriptionService: InscriptionsService,
    public dialogRef: MatDialogRef<CourseDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.students = this.data.students;
    this.course = this.data.course;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CourseDetailDialogComponent);
  }

  removeStudent(studentId: number, courseId: number, index: number){
    this._inscriptionService.removeSingleInscription(studentId, courseId);
    this.students.splice(index, 1);
  }
}