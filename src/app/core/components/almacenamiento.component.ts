import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStoredType } from '@core/models/almacenamiento.interface';

@Component({
  selector: 'app-almacenamiento',
  templateUrl: './almacenamiento.component.html',
  styleUrls: []
})
export class AlmacenamientoComponent {
  @Input('form')
  public almacenamientoForm: FormGroup;
  tipos: string[] = Object.values(IStoredType);
}
