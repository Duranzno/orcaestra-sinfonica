import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Persona, PersonaTipo } from '../shared/autor.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
  form = new FormGroup({
    'nombre': new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    'apellido': new FormControl('', [Validators.required,
    Validators.minLength(3)])
  });
  autores: Persona[] = [
    { nombre: 'Ludwing', apellido: 'Beethoven', tipo: PersonaTipo.AUTOR },
    { nombre: 'Eduardo', apellido: 'Brito', tipo: PersonaTipo.AUTOR },
    { nombre: 'Pepe', apellido: 'LePierre', tipo: PersonaTipo.AUTOR },
  ];
  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }

  ngOnInit() {
    console.log(Object.values(PersonaTipo));
    console.log(Object.keys(PersonaTipo));
  }
}
