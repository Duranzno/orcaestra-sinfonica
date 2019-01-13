import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonaTipo } from '../models/autor.interface';
@Component({
  selector: 'app-involucrados',
  templateUrl: './involucrados.component.html',
  styles: [],
})
export class InvolucradosComponent {
  @Input('form') public involucradosForm: FormGroup;
  personas: string[] = Object.values(PersonaTipo);
}
