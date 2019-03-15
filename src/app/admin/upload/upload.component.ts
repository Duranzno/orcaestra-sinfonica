import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PersonaTipo, UploadFile, Score, IScore, MediaType } from '../../core/models';
import { OrcaState, From } from 'src/app/core/store';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit, OnDestroy {
  get instrumentos() { return this.secondFormGroup.get('instrumentos') as FormArray; }
  get almacenamiento() { return this.secondFormGroup.get('almacenamiento') as FormArray; }
  get generos() { return this.firstFormGroup.get('generos') as FormArray; }
  get gente() { return this.secondFormGroup.get('gente') as FormArray; }

  constructor(
    private _fb: FormBuilder,
    private store: Store<OrcaState>) {
  }
  personas: string[] = Object.values(PersonaTipo);

  generosTodos = ['Barroco', 'Clasico', 'Alma Llanera'];
  @ViewChild('generoInput') generoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  chipInputCtrl = new FormControl();

  files: UploadFile[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  $loading: Observable<boolean>;
  subscriptions: Subscription = new Subscription();
  show(files: UploadFile[]) { console.log('admin/upload', files); this.files = files; }

  ngOnInit() {
    this.$loading = this.store.select(From.ui.getIsLoading);
    this.subscriptions.add(this.store.select(From.music.getGeneros).subscribe(val => this.generosTodos = val));
    this.firstFormGroup = this._fb.group({
      obra: [''],
      its: [''],
      extrainfo: [''],
      youtube: [''],
      generos: this._fb.array([])
    });
    this.secondFormGroup = this._fb.group({
      gente: this._fb.array([
        this.initPersona(),
      ]),
      almacenamiento: this._fb.array([
        this.initAlmacenamiento(),
      ]),
      instrumentos: this._fb.array([
        this.initInstrumento(),
      ]),
    });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  onSave() {
    const score: IScore = this.secondFormGroup.value as IScore;
    this.store.dispatch(new From.music.SetPartitura(score));
    this.files = this.files.concat({
      type: MediaType.YOUTUBE,
      file: new File(['foo', 'bar'], this.firstFormGroup.get('youtube').value),
    });
    this.newGenre(this.generosTodos, this.firstFormGroup.get('generos').value);
    this.store.dispatch(new From.media.ManageMediaArray({ files: this.files }));

  }

  newGenre(orig: string[], modified: string[]) {
    modified.filter(x => !orig.includes(x)).forEach(nuevoGenero => {
      console.log(`nuevo genero se debe agregar ${nuevoGenero}`);
      // this.store.dispatch(new From.media.PostCategory("genero",nuevoGenero));
    });
  }




  // -------------------------------PERSONA
  initPersona() {
    return this._fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: [''],
      tipo: ['']
    });
  }
  addPersona() { this.gente.push(this.initPersona()); }
  removePersona(i: number) { this.gente.removeAt(i); }

  // -------------------------------GENERO
  initGenero() {
    return this._fb.group({
      nombre: [''],
    });
  }
  addGenero() { this.generos.push(this.initGenero()); }
  removeGenero(i: number) { this.generos.removeAt(i); }

  selectedGenero(event: MatAutocompleteSelectedEvent): void {
    this.addGeneroEvent(event.option.viewValue);
    this.generoInput.nativeElement.value = '';
    // this.genCtrl.setValue(null);
  }
  private addGeneroEvent(value: string) {
    const index = this.generos.value.findIndex((e: string) => e.trim() === value.trim());

    if (index === -1) {
      this.generos.value.push(value.trim());
    }
  }
  addChip(event: MatChipInputEvent): void {
    // if (!this.matAutocomplete.isOpen) {
    // console.log(this.generos);
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) { this.addGeneroEvent(value); }
    if (input) { input.value = ''; }
    // this.genCtrl.setValue(null);
    // }
  }
  removeChip(genero: string): void {
    const index = this.generos.value.indexOf(genero);
    if (index >= 0) {
      this.generos.value.splice(index, 1);
    }
  }

  // -------------------------------ALMACENAMIENTO
  initAlmacenamiento() {
    return this._fb.group({
      cantidad: [''],
      tipo: [''],
    });
  }
  addAlmacenamiento() { this.almacenamiento.push(this.initAlmacenamiento()); }
  removeAlmacenamiento(i: number) { this.almacenamiento.removeAt(i); }
  // -------------------------------INSTRUMENTO
  initInstrumento() {
    return this._fb.group({
      nombre: [''],
    });
  }
  addInstrumento() { this.instrumentos.push(this.initInstrumento()); }
  removeInstrumento(i: number) { this.instrumentos.removeAt(i); }


}
