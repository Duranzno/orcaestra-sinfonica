import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-input',
  template: `
    <p>
      media-input works!
      <app-audio></app-audio>
      <mat-slider min="1" max="4" step="1" value="1" vertical thumbLabel tickInterval="1" (input)="rowChange($event)">
      </mat-slider>
      <mat-grid-list cols="1" rowHeight="fit" style="height: 500px;width: 500px">
        <mat-grid-tile *ngFor="let tile of modTiles" [style.background]="tile.color">
          <pre>{{tile.text}}</pre>
          <app-camera></app-camera>

        </mat-grid-tile>
      </mat-grid-list>
    </p>
  `,
})
export class MediaInputComponent implements OnInit {
  tiles = [
    { text: 'One', color: 'lightblue' },
    { text: 'Two', color: 'lightgreen' },
    { text: 'Threae', color: 'lightpink' },
    { text: 'Four', color: '#DDBDF1' },
  ];
  modTiles = [];
  cols: number = 1
  constructor() { }

  ngOnInit() {
    this.modTiles = this.tiles;
  }
  rowChange({ value }: any) {
    console.log(`Deberian haber ${value} columnas`);
    this.cols = value;
    this.modTiles = this.tiles.slice(0, value);
  }

}
