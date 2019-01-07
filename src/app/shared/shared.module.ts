import { NgModule } from '@angular/core';

import { InvolucradosComponent } from './ui/involucrados.component';
import { InstrumentosComponent } from './ui/instrumentos.component';
import { AlmacenamientoComponent } from './ui/almacenamiento.component';
import { GenerosComponent } from './ui/generos.component';
import { FileComponent } from './ui/file.component';

const sharedStuff = [
  InstrumentosComponent,
  InvolucradosComponent,
  AlmacenamientoComponent,
  GenerosComponent,
  FileComponent,
];
@NgModule({
  imports: sharedStuff,
  exports: sharedStuff,
})
export class SharedModule { }
