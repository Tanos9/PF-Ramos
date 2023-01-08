import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/courses.model';
import { InscriptionData } from 'src/app/models/inscription.model';
import { Student } from 'src/app/models/student.model';
import { InscriptionsService } from 'src/app/services/inscriptions.service';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html'
})
export class InscriptionDialogComponent {

  studentNameControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(75)]);

  courseControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(200)]);


  inscriptionForm = new FormGroup({
    studentName: this.studentNameControl,
    course: this.courseControl
  })

  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: InscriptionData | null,
    private readonly _inscriptionsService: InscriptionsService
  ) {
    if (data) {
      this.inscriptionForm.patchValue(data)
    }
  }

  getStudents(): Student[]{
    return this._inscriptionsService.getStudents();
  }

  getCourses(): Course[]{
    return this._inscriptionsService.getCourses();
  }

  close() {
    this.dialogRef.close()
  }
}