import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/courses.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html'
})
export class CourseDialogComponent {

  nameControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(75)]);

  descriptionControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(200)]);


  courseForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl
  })

  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: Course | null,
  ) {
    if (data) {
      this.courseForm.patchValue(data)
    }
  }

  close() {
    this.dialogRef.close()
  }
}
