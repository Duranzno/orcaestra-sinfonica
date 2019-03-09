import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IStoredType } from 'src/app/core/models';

@Component({
  selector: 'app-almacenamiento',
  templateUrl: './almacenamiento.component.html',
  styleUrls: []
})
export class AlmacenamientoComponent {
  @Input() public almacenamientoForm: FormGroup;
  @Input() public formGroup: FormGroup;
  @Input() private _fb: FormBuilder;
  tipos: string[] = Object.values(IStoredType);

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
