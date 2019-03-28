import { Component, OnInit, Input } from '@angular/core';
import { DataScore, IElementoIcono } from '../../../../core/models';

@Component({
  selector: 'app-icon-arr-summary',
  template: `
  <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="5px" >
  <div *ngFor="let i of array">
  </div>
  </div>
  `,
  styleUrls: ['./icon-summary.component.scss']
})
export class IconSummaryArrComponent implements OnInit {
  @Input('dataScoreArray') array: IElementoIcono[] = [];
  constructor() { }

  ngOnInit() {
  }

}
@Component({
  selector: 'app-icon-summary',
  template: `
  <mat-icon [svgIcon]="(i&&i.icono)?i.icono:(icono)?icono:'musical-note'" [matTooltip]="(i&&i.info)?i.info:(info)?info:'stuff'"> 
  </mat-icon>
  `,
  styleUrls: ['./icon-summary.component.scss']
})
export class IconSummaryComponent implements OnInit {
  @Input('elemento') i?: IElementoIcono;
  @Input('icono') icono?: string;
  @Input('info') info?: string;
  constructor() { }

  ngOnInit() {
  }

}
