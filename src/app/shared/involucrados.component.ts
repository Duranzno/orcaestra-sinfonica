import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonaTipo} from '../shared/autor.interface';
@Component({
  selector: 'involucrados',
  templateUrl: './involucrados.component.html',
  styles: [],
})
export class InvolucradosComponent{
  @Input('involucrados')
  public involucradosForm: FormGroup;
  personas:string[]= Object.values(PersonaTipo) ;
}
