import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonaTipo } from 'src/app/core/models';
@Component({
  selector: 'app-involucrados',
  styleUrls: [],
  template: `
  <div [formGroup]="parentForm" fxLayout="row" fxLayoutAlign="center center"  fxLayoutGap="10px">
    <mat-form-field>
      <input matInput placeholder="Nombre" type="text" formControlName="nombre">
      <mat-error *ngIf="parentForm.controls['nombre'].valid">Se necesita el nombre.</mat-error>
    </mat-form-field>
      <!-- Apellido de la Persona Involucrada  -->
    <mat-form-field>
      <input matInput placeholder="Apellido" type="text" formControlName="apellido">
    </mat-form-field>
    <!-- Tipo de Persona -->
    <mat-form-field>
      <mat-select placeholder="Tipo de Persona Involucrada" formControlName="tipo">
        <mat-option *ngFor="let p of personas" [value]="p">{{p}}</mat-option>
      </mat-select>
      </mat-form-field>
      <button mat-icon-button color="primary" (click)="delete()" style="   vertical-align: text-bottom;" >
        <mat-icon>close</mat-icon>
      </button>     
  </div>
  `
})
export class InvolucradosComponent {
  @Input('form') public parentForm: FormGroup;
  @Input('n') n: number;
  @Output() deletable = new EventEmitter<number>();
  delete() { this.deletable.emit(this.n) }
  personas: string[] = Object.values(PersonaTipo);
}
