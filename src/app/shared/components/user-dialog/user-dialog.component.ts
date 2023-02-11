import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: [
  ]
})
export class UserDialogComponent {

  firstNameControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  lastNameControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  emailControl = new FormControl('', [Validators.email, Validators.required]);

  isAdminControl = new FormControl(false);

  passwordControl = new FormControl('',
  [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  userForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    isAdmin: this.isAdminControl,
    password: this.passwordControl
  })

  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: User | null,
  ) {
    if (data) {
      this.userForm.patchValue(data)
    }
  }

  close() {
    this.dialogRef.close()
  }
}
