import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Persona, PersonaTipo } from '../shared/autor.interface';
import { IScore } from '../shared/partitura.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
  public form:FormGroup;
  personas:string[]= Object.values(PersonaTipo);
  generosTodos = ['Barroco', 'Clasico', 'Alma Llanera'];

  constructor(private _fb: FormBuilder){ }

  ngOnInit() {
    this.form=this._fb.group({
      obra:[''],
      its:[''],
      gente:this._fb.array([
        this.initPersona(),
      ]),  
      generos:this._fb.array([
        this.initGenero(),
      ]),       
      almacenamiento:this._fb.array([
        this.initAlmacenamiento(),
      ]),
      extrainfo:[''],
    })
    console.log('admin',this.form);
  }
  initPersona(){
    return this._fb.group({
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      apellido:[''],
      tipo:['']
    });
  }
  initGenero(){
    return this._fb.group({
      nombre:['']
    });
  }
  addGenero(){
    const control = <FormArray>this.form.controls['generos'];
    control.push(this.initGenero());
  }
  removeGenero(i:number){
    const control = <FormArray>this.form.controls['generos'];
    control.removeAt(i);
  }

  addPersona(){
    const control = <FormArray>this.form.controls['gente'];
    control.push(this.initPersona());
  }
  removePersona(i:number){
    const control = <FormArray>this.form.controls['gente'];
    control.removeAt(i);
  }
  initAlmacenamiento(){
    return this._fb.group({
      cantidad:[''],
      tipo:[''],
    });
  }
  addAlmacenamiento(){
    const control = <FormArray>this.form.controls['almacenamiento'];
    control.push(this.initAlmacenamiento());
  }
  removeAlmacenamiento(i:number){
    const control = <FormArray>this.form.controls['almacenamiento'];
    control.removeAt(i);
  }
  save(model:IScore){
    console.log(model);
  }
  onSubmit(){
    console.log(this.form.value)
  }
}
