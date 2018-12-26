import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona, PersonaTipo} from '../../shared/autor.interface';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
	autores:Persona[]=[
		{nombre:'Ludwing',apellido:'Beethoven',tipo:PersonaTipo.AUTOR},
		{nombre:'Eduardo',apellido:'Brito',tipo:PersonaTipo.AUTOR},
		{nombre:'Pepe',apellido:'LePierre',tipo:PersonaTipo.AUTOR},
	];
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
