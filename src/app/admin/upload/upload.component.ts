import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PersonaTipo, UploadFile, Score, IScore, MediaType, CategoriaTipo } from '../../core/models';
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
  get grupos() { return this.firstFormGroup.get('grupos') as FormArray; }
  personas: string[] = Object.values(PersonaTipo);
  generosTodos: string[] = [];
  instrumentosTodos: string[] = [];
  gruposTodos: string[] = [];


  @ViewChild('generoInput') generoInput: ElementRef<HTMLInputElement>;
  @ViewChild('instrumentoInput') instrumentoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autoI') matAutocompleteI: MatAutocomplete;
  chipInputCtrl = new FormControl();
  chipInputCtrlI = new FormControl();

  files: UploadFile[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  $loading: Observable<boolean>;
  subscriptions: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private store: Store<OrcaState>) {
  }
  show(files: UploadFile[]) { console.log('admin/upload', files); this.files = files; }

  ngOnInit() {

    this.$loading = this.store.select(From.ui.getIsLoading);
    this.subscriptions.add(this.store.select(From.music.getGeneros).subscribe(val => this.generosTodos = val));
    this.subscriptions.add(this.store.select(From.music.getInstrumentos).subscribe(val => this.instrumentosTodos = val));
    this.subscriptions.add(this.store.select(From.music.getGrupos).subscribe(val => this.gruposTodos = val));
    this.firstFormGroup = this._fb.group({
      obra: [''],
      its: [''],
      extrainfo: [''],
      youtube: [''],
      generos: this._fb.array([]),
      grupos: this._fb.array([])
    });
    this.secondFormGroup = this._fb.group({
      gente: this._fb.array([
        this.initPersona(),
      ]),
      almacenamiento: this._fb.array([
        this.initAlmacenamiento(),
      ]),
      instrumentos: this._fb.array([]),
    });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  onSave() {
    const score: IScore = this.createScore()
    this.store.dispatch(new From.music.SetPartitura(score));
    this.files = this.files.concat({
      type: MediaType.YOUTUBE,
      file: new File(['foo', 'bar'], this.firstFormGroup.get('youtube').value),
    });
    this.newCateg(this.generosTodos, this.firstFormGroup.get('generos').value, CategoriaTipo.GENERO);
    this.newCateg(this.instrumentosTodos, this.secondFormGroup.get('instrumentos').value, CategoriaTipo.INSTRUMENTOS);
    this.store.dispatch(new From.media.ManageMediaArray({ files: this.files }));
  }

  newCateg(orig: string[], modified: string[], tipo: CategoriaTipo) {
    modified.filter(x => !orig.includes(x)).forEach(categoria => {
      console.log(`nuevo ${tipo} se debe agregar ${categoria}`);
      this.store.dispatch(new From.media.PostCateg({ tipo, categoria }));
    });
  }


  createScore() {
    return <IScore>{
      its: this.firstFormGroup.get('its').value,
      obra: this.firstFormGroup.get('obra').value,
      extrainfo: this.firstFormGroup.get('extrainfo').value,
      generos: this.firstFormGroup.get('generos').value,
      almacenamiento: this.secondFormGroup.get('almacenamiento').value,
      gente: this.secondFormGroup.get('gente').value,
      instrumentos: this.secondFormGroup.get('instrumentos').value,
    }
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
  // -------------------------------Instrumentos

  selectedInstrumento(event: MatAutocompleteSelectedEvent): void {
    this.addInstrumentoEvent(event.option.viewValue);
    this.instrumentoInput.nativeElement.value = '';
    this.chipInputCtrlI.setValue(null);
  }
  private addInstrumentoEvent(value: string) {
    const index = this.instrumentos.value.findIndex((e: string) => e.trim() === value.trim());

    if (index === -1) {
      this.instrumentos.value.push(value.trim());
    }
  }
  addChipI(event: MatChipInputEvent): void {
    // if (!this.matAutocomplete.isOpen) {
    if ((event.value || '').trim()) { this.addInstrumentoEvent(event.value); }
    if (event.input) { event.input.value = ''; }
    this.chipInputCtrlI.setValue(null);
    // }
  }
  removeChipI(genero: string): void {
    const index = this.instrumentos.value.indexOf(genero);
    if (index >= 0) {
      this.instrumentos.value.splice(index, 1);
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


}
