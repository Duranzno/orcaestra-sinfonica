import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStoredType } from '../models';

@Component({
  selector: 'app-almacenamiento',
  templateUrl: './almacenamiento.component.html',
  styleUrls: []
})
export class AlmacenamientoComponent {
  @Input()
  public almacenamientoForm: FormGroup;
  tipos: string[] = Object.values(IStoredType);
}
