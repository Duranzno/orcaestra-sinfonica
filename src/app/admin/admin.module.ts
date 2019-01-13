import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { AdminComponent } from './admin.component';
import { AlmacenamientoComponent } from '../shared/ui/almacenamiento.component';
import { GenerosComponent } from '../shared/ui/generos.component';
import { InvolucradosComponent } from '../shared/ui/involucrados.component';
import { FileComponent } from '../shared/ui/file.component';
import { InstrumentosComponent } from '../shared/ui/instrumentos.component';
import { UploadService } from './upload.service';
@NgModule({
    declarations: [
        AdminComponent,
        UploadComponent,
        AlmacenamientoComponent,
        FileComponent,
        GenerosComponent,
        InvolucradosComponent,
        InstrumentosComponent,
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        AdminRoutingModule
    ],
    providers: [
        UploadService,
    ]
})
export class AdminModule { }
