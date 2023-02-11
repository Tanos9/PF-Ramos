import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authenticatedUserSelector } from 'src/app/auth/store/auth.actions';
import { AppState } from 'src/app/core/models/app-state.model';
import { Inscription, InscriptionData } from 'src/app/models/inscription.model';
import { Student } from 'src/app/models/student.model';
import { InscriptionsService } from 'src/app/services/inscriptions.service';
import { DeleteAlertDialogComponent } from 'src/app/shared/components/delete-alert-dialog/delete-alert-dialog/delete-alert-dialog.component';
import { InscriptionDialogComponent } from 'src/app/shared/components/inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscription-page',
  templateUrl: './inscription-page.component.html',
  styleUrls: ['./inscription-page.component.scss']
})
export class InscriptionPageComponent {
  public inscriptions!: InscriptionData[];
  private user: any;
  private readonly customDeleteTitle = "Confirma eliminar esta inscripción?";
  private readonly customDeleteDetail = "Se eliminara la inscripción de este alumno del curso indicado"

  displayedColumns = ['student', 'course'];

  constructor(
    private readonly _dialogService: MatDialog,
    private readonly _inscriptionService: InscriptionsService,
    private readonly _store: Store<AppState>
  )
  {
    this._inscriptionService.inscriptions$.subscribe(() => {
      this.inscriptions = _inscriptionService.getInscriptions();
    });
  }

  ngOnInit(){
    this.inscriptions = this._inscriptionService.getInscriptions();
    this._store.select(authenticatedUserSelector).subscribe((user) => {
      this.user = user;
    });
    this.setAdminOptions();
  }

  setAdminOptions(){
    if(this.user.isAdmin) {
      this.displayedColumns.push('delete');
    }
  }

  addInscription() {
    const dialog = this._dialogService.open(InscriptionDialogComponent)

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        let inscription = new Inscription(0, value.studentName, value.course);
        this._inscriptionService.addInscription(inscription);
      }
    })
  }

  removeInscription(inscription: InscriptionData) {
    this._inscriptionService.removeInscription(inscription.inscriptionId)
  }

  editInscription(inscription: Inscription) {
    const dialog = this._dialogService.open(InscriptionDialogComponent,
    {
      data: inscription,
    })

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this._inscriptionService.editInscription(inscription.id, data);
      }
    })
  }

  openDeleteDialog(inscription: InscriptionData): void {
    const dialogRef = this._dialogService.open(DeleteAlertDialogComponent,
      {
        data: {
          customTitle: this.customDeleteTitle,
          customDetail: this.customDeleteDetail
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeInscription(inscription);
      }
   });
 }
}