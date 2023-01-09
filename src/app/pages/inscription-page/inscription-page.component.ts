import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inscription, InscriptionData } from 'src/app/models/inscription.model';
import { Student } from 'src/app/models/student.model';
import { InscriptionsService } from 'src/app/services/inscriptions.service';
import { InscriptionDialogComponent } from 'src/app/shared/components/inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscription-page',
  templateUrl: './inscription-page.component.html',
  styleUrls: ['./inscription-page.component.scss']
})
export class InscriptionPageComponent {

  inscriptions: InscriptionData[] = [];

  displayedColumns = ['student', 'course', 'delete'];

  constructor(
    private readonly _dialogService: MatDialog,
    private readonly _inscriptionService: InscriptionsService
  )
  {
    this._inscriptionService.inscriptionListChanged$.subscribe(() => {
      this.inscriptions = _inscriptionService.getInscriptions();
    });
  }

  ngOnInit(){
    this.inscriptions = this._inscriptionService.getInscriptions();
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

  getStudents(): Student[]{
    return this._inscriptionService.getStudents();
  }
  
}