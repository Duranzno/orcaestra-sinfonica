import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStoredType} from '../models/almacenamiento.interface';

@Component({
  selector: 'almacenamiento',
  templateUrl: './almacenamiento.component.html',
  styles: []
})
export class AlmacenamientoComponent{
  @Input('almacenamiento')
  public almacenamientoForm: FormGroup;
  tipos:string[]= Object.values(IStoredType) ;
}
