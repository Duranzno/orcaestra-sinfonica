import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PdfService, UIService } from 'src/app/core/services';


@Component({
  selector: 'app-media-input',
  template: `  
  <div class="cardHolder" fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="1em" s>
  <mat-card fxFlex>
  <mat-card-title> Creador de Partituras
  </mat-card-title>
  <mat-card-subtitle>
  Seleccione los rectangulos para tomar una foto
  </mat-card-subtitle>
  <mat-card-content>
  <div fxLayout="row wrap" fxLayoutAlign="space-between stretch">  
    <mat-grid-list gutterSize="0px" cols="1" rowHeight="fit" style="height: 500px;width: 500px">
      <mat-grid-tile  *ngFor="let tile of modGrid;let i=index" [style.background]="tile.color">
        <app-camera style="width: 100%;height: 100%;" [title]="tile.text" [reset]="resetSubject.asObservable()" (img)="addPartialImage($event,i)"></app-camera>
      </mat-grid-tile>
    </mat-grid-list>
    <mat-slider min="1" max="4" step="1" value="1" vertical thumbLabel tickInterval="1" (input)="rowChange($event)" invert>
    </mat-slider>
  </div>
  <mat-card-actions>
    <button mat-raised-button color="primary" (click)="(nPages)?addPage():addImageGrid();">
      {{(nPages)?'Añadir pagina '+(nPages+1):'Agregar primera pagina'}}</button>
    <button mat-raised-button color="primary" (click)="resetPDF()">Reiniciar</button>
    <div fxFlex></div>
    <button mat-raised-button color="accent"   [disabled]="!nPages"
      (click)="savePdf()">
      Guardar PDF
    </button>
     </mat-card-actions>
  </mat-card-content>
  </mat-card>
  </div>
  `,
})
export class MediaInputComponent implements OnInit {
  private resetSubject: Subject<void> = new Subject<void>();
  grid = [
    { text: 'Uno', color: 'lightblue' },
    { text: 'Dos', color: 'lightgreen' },
    { text: 'Tres', color: 'lightpink' },
    { text: 'Cuatro', color: '#DDBDF1' },
  ];
  imageArr: any[];
  modGrid = [];
  nPages: number = 0;

  constructor(private pdf: PdfService, private ui: UIService) { }

  addPartialImage(img: string | ArrayBuffer, index: number) {
    this.imageArr[index] = img;
  }
  savePdf() {
    if (this.nPages) this.pdf.save("Titulo");
  }
  addImageGrid() {
    if (this.imageArr.some(img => img === '')) {
      this.ui.showSnackbar('Faltan Imagenes', 5)
      return console.log('Faltan imagenes')
    }
    this.pdf.addImages(...this.imageArr)
    this.nPages++;
    this.resetPDF();
  }
  addPage() {
    this.pdf.addPage();
    this.addImageGrid();
  }
  ngOnInit() {
    this.modGrid = this.grid.slice(0, 1);
    this.imageArr = this.modGrid.map(v => '');
  }
  rowChange({ value }: any) {
    console.log(`Deberian haber ${value} columnas`);
    this.modGrid = this.grid.slice(0, value);
    this.imageArr = this.modGrid.map(v => '');
    this.resetPDF();
  }

  resetPDF() {
    this.resetSubject.next()
  }

}
