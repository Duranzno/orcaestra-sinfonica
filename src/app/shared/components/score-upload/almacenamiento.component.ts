import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RegistroTipo } from 'src/app/core/models';

@Component({
  selector: 'app-almacenamiento',
  template: `
  <div [formGroup]="almacenamientoForm" fxLayout="row" fxLayoutAlign="center center"  fxLayoutGap="10px">
  <mat-form-field>
    <mat-select placeholder="Tipo de Almacenamiento" formControlName="tipo">
      <mat-option *ngFor="let t of tipos " [value]="tipos[0]">
        {{t}}
      </mat-option>
    </mat-select>
  </mat-form-field>
  <mat-slider thumbLabel tickInterval="auto" min="1" max="25" value="1" formControlName="cantidad"></mat-slider>
  <button mat-icon-button color="primary" (click)="delete()" style="   vertical-align: text-bottom;" >
        <mat-icon>close</mat-icon>
      </button>
  </div>
`,
  styleUrls: []
})
export class AlmacenamientoComponent {
  @Input() public almacenamientoForm: FormGroup;
  @Input() public formGroup: FormGroup;
  @Input() private _fb: FormBuilder;
  tipos: string[] = Object.values(RegistroTipo);

  initAlmacenamiento() {
    return this._fb.group({
      cantidad: [''],
      tipo: [''],
    });
  }
  @Input('n') n: number;
  @Output() deletable = new EventEmitter<number>();
  delete() { this.deletable.emit(this.n) }
  get almacenamiento() { return this.formGroup.get('almacenamiento') as FormArray; }
  addAlmacenamiento() { this.almacenamiento.push(this.initAlmacenamiento()); }
  removeAlmacenamiento(i: number) { this.almacenamiento.removeAt(i); }

}
