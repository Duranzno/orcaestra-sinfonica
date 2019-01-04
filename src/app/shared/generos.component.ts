import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'generos',
  templateUrl: './generos.component.html',
  styles: []
})
export class GenerosComponent implements OnInit{
  @Input('form')public generosForm: FormGroup;
  @Input('generos')generosTodos:string[];
  @ViewChild('generoInput') generoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  generosFiltrados: Observable<string[]>;
  genCtrl = new FormControl();
  
  partituraNueva:{
    generos:string[]
  }={generos:[]}
  

  constructor() {
    this.generosFiltrados = this.genCtrl.valueChanges.pipe(
      startWith(null),
      map((gen: string | null) => gen ? this._filter(gen) : this.generosTodos.slice()));
  }
  ngOnInit(){
    // (this.generosForm).push("Navidad")
    console.log(this.generosForm)

  }
  remove(genero: string): void {
    const index = this.partituraNueva.generos.indexOf(genero);
    if (index >= 0) {
      this.partituraNueva.generos.splice(index, 1);
    }
  }
  private addGenero(value: string) {  
    console.log(this.generosForm.value)
    const index = this.partituraNueva.generos.findIndex((e: string) => e.trim() === value.trim());
    
    if (index === -1) {
      this.partituraNueva.generos.push(value.trim());
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
  selected(event: MatAutocompleteSelectedEvent): void {
    this.addGenero(event.option.viewValue);
    this.generoInput.nativeElement.value = '';
    this.genCtrl.setValue(null);
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // this.generos.filter(g => g.toLowerCase().indexOf(filterValue) === 0);
    // this.generos
    //             .map(val=>val.toLowerCase())
    //             .filter(val=>this.partituraNueva.generos.map(g=>g.toLowerCase()).indexOf(val)===-1)
    //             .map(string=> string.charAt(0).toUpperCase() + string.slice(1));
    return this.generosTodos.filter(g => g.toLowerCase().indexOf(filterValue) === 0);

  }
}


