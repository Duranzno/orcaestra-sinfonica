import { Component, OnInit } from '@angular/core';
import { PdfService } from './pdf/pdf.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-media-input',
  template: `  
  <div fxLayout="column" fxLayoutAlign="space-between stretch">  
    <mat-grid-list gutterSize="0px" cols="1" rowHeight="fit" style="height: 500px;width: 500px">
      <mat-grid-tile  *ngFor="let tile of modTiles;let i=index" [style.background]="tile.color">
        <pre>{{tile.text}}</pre>
        <app-camera [reset]="resetSubject.asObservable()" (img)="addPartialImage($event,i)"></app-camera>
      </mat-grid-tile>
    </mat-grid-list>
    <mat-slider min="1" max="4" step="1" value="1" vertical thumbLabel tickInterval="1" (input)="rowChange($event)" invert>
    </mat-slider>
  </div>
  <button mat-button (click)="addPage()">Añadir Pagina</button>
  <button mat-button (click)="savePdf()" [disabled]="loaded">Guardar PDF</button>

  `,
})
export class MediaInputComponent implements OnInit {
  tiles = [
    { text: 'One', color: 'lightblue' },
    { text: 'Two', color: 'lightgreen' },
    { text: 'Threae', color: 'lightpink' },
    { text: 'Four', color: '#DDBDF1' },
  ];
  imageArr: any;
  loaded = false;
  modTiles = [];
  private resetSubject: Subject<void> = new Subject<void>();

  reset() {
    this.resetSubject.next()
  }
  constructor(
    private pdf: PdfService
  ) { }

  addPartialImage(img: string | ArrayBuffer, index: number) {
    this.imageArr[index] = img;

  }
  savePdf() {
    // if (this.imageArr.some(img => img === '')) { return console.log('Faltan imagenes') }
    if (this.loaded) this.pdf.save("Titulo");
    // this.pdf.save(...this.imageArr);
  }
  addPage() {
    if (this.imageArr.some(img => img === '')) { return console.log('Faltan imagenes') }
    this.loaded = true;
  }
  ngOnInit() {
    this.modTiles = this.tiles.slice(0, 1);
    this.imageArr = this.modTiles.map(v => '');
  }
  rowChange({ value }: any) {
    console.log(`Deberian haber ${value} columnas`);
    this.modTiles = this.tiles.slice(0, value);
    this.imageArr = this.modTiles.map(v => '');
    this.reset();
  }

}
