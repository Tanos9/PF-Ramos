import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styles: [
  ]
})
export class StudentDialogComponent {

  firstNameControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  lastNameControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  emailControl = new FormControl('', [Validators.email, Validators.required]);

  careerControl = new FormControl('', [Validators.required]);

  studentForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    career: this.careerControl
  })

  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: Student | null,
  ) {
    if (data) {
      this.studentForm.patchValue(data)
    }
  }

  close() {
    this.dialogRef.close()
  }
}
