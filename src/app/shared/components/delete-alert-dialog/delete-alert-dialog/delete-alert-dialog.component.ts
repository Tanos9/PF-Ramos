import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-alert-dialog',
  templateUrl: './delete-alert-dialog.component.html',
  styleUrls: ['./delete-alert-dialog.component.scss']
})
export class DeleteAlertDialogComponent {
  customTitle: string = '';
  customDetail: string = '';

  constructor(public dialogRef: MatDialogRef<DeleteAlertDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.customTitle = this.data.customTitle;
    this.customDetail = this.data.customDetail;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
