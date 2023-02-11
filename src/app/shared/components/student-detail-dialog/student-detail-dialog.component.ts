import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { authenticatedUserSelector } from 'src/app/auth/store/auth.actions';
import { AppState } from 'src/app/core/models/app-state.model';
import { Course } from 'src/app/models/courses.model';
import { Student } from 'src/app/models/student.model';
import { InscriptionsService } from 'src/app/services/inscriptions.service';
import { DeleteAlertDialogComponent } from '../delete-alert-dialog/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'app-student-detail-dialog',
  templateUrl: './student-detail-dialog.component.html',
  styleUrls: ['./student-detail-dialog.component.scss']
})
export class StudentDetailDialogComponent {
  private readonly customDeleteTitle = "Confirma eliminar esta inscripción?";
  private readonly customDeleteDetail = "Se eliminara la inscripción a este curso";
  courses: Course[] = []; 
  student!: Student;
  user: any;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<StudentDetailDialogComponent>,
    private readonly _inscriptionService: InscriptionsService,
    private readonly _store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.courses = this.data.courses;
    this.student = this.data.student;
    this._store.select(authenticatedUserSelector).subscribe((user) => {
      this.user = user;
    });
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

  openDeleteDialog(studentId: number, courseId: number, index: number): void {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent,
      {
        data: {
          customTitle: this.customDeleteTitle,
          customDetail: this.customDeleteDetail
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeInscription(studentId, courseId, index);
      }
   });
 }
}
