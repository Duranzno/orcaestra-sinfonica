import { Component, OnInit, Input } from '@angular/core';
import { DataScore, IElementoIcono } from '../../../../core/models';

@Component({
  selector: 'app-icon-summary',
  template: `
  <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="5px" >
  <mat-icon
  *ngFor="let i of array"
  [matTooltip]="(i.info)?i.info:'stuff'"
  [svgIcon]="i.icono">
</mat-icon>
  </div>
  `,
  styleUrls: ['./icon-summary.component.scss']
})
export class IconSummaryComponent implements OnInit {
  @Input('dataScoreArray') array: IElementoIcono[] = [];
  constructor() { }

  ngOnInit() {
  }

}
