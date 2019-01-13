import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styles: []
})
export class InstrumentosComponent {
  @Input('form') form: FormGroup;

}
