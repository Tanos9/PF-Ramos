import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionPageComponent } from './inscription-page.component';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';



@NgModule({
  declarations: [
    InscriptionPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InscriptionsRoutingModule,
    SharedModule,
    MatTableModule,
  ]
})
export class InscriptionsModule { }
