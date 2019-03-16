import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-instrumentos',
  template: `
  <div [formGroup]= "form">
  <mat-form-field>
    <mat-select placeholder ='Tipo de Almacenamiento' formControlName = "tipo" >
      <mat-option *ngFor='let t of tipos ' [value] = "tipos[0]" >
    {{t}}
      </mat-option>
    </mat-select>
  </mat-form-field>
  <mat-slider thumbLabel tickInterval = "auto" min = "1" max = "25" value = "1" formControlName = "cantidad" > </mat-slider>
</div>
`,
  styleUrls: []
})
export class InstrumentosComponent {
  constructor() { }
  @Input() tipos: string[];
  @Input('form') form: FormGroup;

}
