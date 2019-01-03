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
  personas:string[]= Object.values(PersonaTipo) ;
  constructor(private _fb: FormBuilder){ }

  ngOnInit() {
    this.form=this._fb.group({
      obra:[''],
      its:[''],
      gente:this._fb.array([
        this.initPersona(),
      ]),  
      extrainfo:[''],
    })
    console.log(this.form.controls);
    console.log(this.personas)
  }
  initPersona(){
    return this._fb.group({
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      apellido:[''],
      tipo:['']
    });
  }
  addPersona(){
    const control = <FormArray>this.form.controls['gente'];

    control.push(this.initPersona());
  }
  removePersona(i:number){
    const control = <FormArray>this.form.controls['gente'];
    control.removeAt(i);
  }
  save(model:IScore){
    console.log(model);
  }
}
