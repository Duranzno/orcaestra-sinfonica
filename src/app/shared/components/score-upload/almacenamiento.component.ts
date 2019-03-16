import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { StoredType } from 'src/app/core/models';

@Component({
  selector: 'app-almacenamiento',
  template: `
  <div [formGroup]="almacenamientoForm">
  <mat-form-field>
    <mat-select placeholder="Tipo de Almacenamiento" formControlName="tipo">
      <mat-option *ngFor="let t of tipos " [value]="tipos[0]">
        {{t}}
      </mat-option>
    </mat-select>
  </mat-form-field>
  <mat-slider thumbLabel tickInterval="auto" min="1" max="25" value="1" formControlName="cantidad"></mat-slider>
</div>
`,
  styleUrls: []
})
export class AlmacenamientoComponent {
  @Input() public almacenamientoForm: FormGroup;
  @Input() public formGroup: FormGroup;
  @Input() private _fb: FormBuilder;
  tipos: string[] = Object.values(StoredType);

  initAlmacenamiento() {
    return this._fb.group({
      cantidad: [''],
      tipo: [''],
    });
  }
  get almacenamiento() { return this.formGroup.get('almacenamiento') as FormArray; }
  addAlmacenamiento() { this.almacenamiento.push(this.initAlmacenamiento()); }
  removeAlmacenamiento(i: number) { this.almacenamiento.removeAt(i); }

}
