import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CategoriaTipo, Categoria } from 'src/app/core/models';


@Component({
  selector: 'app-chip',
  template: `
  <div [formGroup]="parentForm">
    <!-- Agregador de Categorias -->
    <mat-form-field>
    <mat-chip-list #chipList>
      <mat-chip 
      selectable="true" removable="true"
      *ngFor="let cat of categArray?.value" (removed)="remove(cat)">
        {{cat}}
        <mat-icon matChipRemove>cancel</mat-icon>
      </mat-chip>
      <input 
      #input matInput matChipInputAddOnBlur="true" matAutocomplete="auto" 
      [placeholder]="categoria" [formControl]="genCtrl"[matChipInputFor]="chipList"  
      [matChipInputSeparatorKeyCodes]="codigosSeparacion"
      (matChipInputTokenEnd)="addChipEvent($event)">

      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="seleccionar($event)">
        <mat-option *ngFor="let g of categoriasDisponibles" [value]="g">
        {{g}}
        </mat-option>
      </mat-autocomplete>
    </mat-chip-list>
  </mat-form-field>

  </div>
  `,
  styleUrls: []
})
export class GenerosComponent {
  @Input('tipo') categoria: CategoriaTipo;
  @Input('form') public parentForm: FormGroup;
  @Input('array') public categoriasDisponibles: string[];

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  codigosSeparacion: number[] = [ENTER, COMMA];
  generosFiltrados: Observable<string[]>;
  genCtrl = new FormControl();

  get categArray() { return this.parentForm.get('generos') as FormArray; }

  constructor() {
    this.generosFiltrados = this.genCtrl.valueChanges.pipe(
      startWith(null),
      map((cat: string | null) => cat ? this._filter(cat) : this.categoriasDisponibles.slice()));
  }

  remove(genero: string): void {
    const index = this.categArray.value.indexOf(genero);
    if (index >= 0) {
      this.categArray.value.generos.splice(index, 1);
    }
  }

  addChipEvent(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) { this._addGenero(value); }
      if (input) { input.value = ''; }
      this.genCtrl.setValue(null);
    }
  }
  seleccionar(event: MatAutocompleteSelectedEvent): void {
    this._addGenero(event.option.viewValue);
    this.input.nativeElement.value = '';
    this.genCtrl.setValue(null);
  }
  private _addGenero(value: string) {
    const index = this.categArray.value
      .findIndex(
        (e: string) =>
          e.trim() === value.trim()
      );

    if (index === -1) {
      this.categArray.value.push(value.trim());
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // this.generos.filter(g => g.toLowerCase().indexOf(filterValue) === 0);
    // this.generos
    //             .map(val=>val.toLowerCase())
    //             .filter(val=>this.partituraNueva.generos.map(g=>g.toLowerCase()).indexOf(val)===-1)
    //             .map(string=> string.charAt(0).toUpperCase() + string.slice(1));
    return this.categoriasDisponibles.filter(g => g.toLowerCase().indexOf(filterValue) === 0);

  }
}


