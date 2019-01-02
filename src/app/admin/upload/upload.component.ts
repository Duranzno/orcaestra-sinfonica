import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Persona, PersonaTipo } from '../../shared/autor.interface';
import { IStoredType } from '../../shared/almacenamiento.interface';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IScore } from '../../shared/partitura.interface';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
  // autoresSubscription: Subscription;

  autores: Persona[] = [
    { nombre: 'Ludwing', apellido: 'Beethoven', tipo: PersonaTipo.AUTOR },
    { nombre: 'Eduardo', apellido: 'Brito', tipo: PersonaTipo.AUTOR },
    { nombre: 'Pepe', apellido: 'LePierre', tipo: PersonaTipo.AUTOR },
  ];
  generosTodos = ['Barroco', 'Clasico', 'Alma Llanera'];
  generosFiltrados: Observable<string[]>;
  genCtrl = new FormControl();
  partituraNueva = {
    obra: '',
    its: 0,
    involucrados: [{
      nombre: '',
      apellido: '',
      tipo: PersonaTipo.AUTOR,
    }],
    generos: [],
    almacenamiento: [{
      tipo: IStoredType.NINGUNO,
      cantidad: 0,
    }],
  };

  @ViewChild('generoInput') generoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor() {
    this.generosFiltrados = this.genCtrl.valueChanges.pipe(
      startWith(null),
      map((gen: string | null) => gen ? this._filter(gen) : this.generosTodos.slice()));
  }
  ngOnInit() {
    console.log(Object.values(IStoredType))
  }
  remove(genero: string): void {
    const index = this.partituraNueva.generos.indexOf(genero);
    if (index >= 0) {
      this.partituraNueva.generos.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) { this.addGenero(value); }
      if (input) { input.value = ''; }
      this.genCtrl.setValue(null);
    }
  }
  private addGenero(value: string) {
    console.log(this.partituraNueva.generos);
    console.log(value);
    const index = this.partituraNueva.generos.findIndex((e: string) => e.trim() === value.trim());
    console.log(index);
    if (index === -1) {
      this.partituraNueva.generos.push(value.trim());
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(this.partituraNueva);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addGenero(event.option.viewValue);
    this.generoInput.nativeElement.value = '';
    this.genCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.generosTodos.filter(g => g.toLowerCase().indexOf(filterValue) === 0);
  }
}
