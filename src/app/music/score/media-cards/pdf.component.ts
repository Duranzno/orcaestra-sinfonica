import { Component, OnInit, Input } from '@angular/core';
import { Media } from 'src/app/core/models';

@Component({
  selector: 'app-pdf',
  template: `
    <mat-card class="media-card">
      <mat-card-header>
        <mat-card-title>Archivo PDF</mat-card-title>
      </mat-card-header>
      <mat-card-actions>
      <a [href]="downloadUrl"  target="_blank" download #anchor>a</a>
      <button mat-icon-button (click)="anchor.click()"></button>
      <div flex></div>
      <button mat-button (click)="otherDw()">
      Descargar Partitura
      <mat-icon aria-label="Descargar PDF">
        cloud_download
      </mat-icon>
      </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./media.card.component.scss']
})
export class PdfComponent implements OnInit {
  @Input('media') media: Media;
  urls: string[];
  downloadUrl: string;
  constructor() { }
  otherDw() {
    window.location.href = this.downloadUrl;
  }
  ngOnInit() {
    this.downloadUrl = this.media.originArray.pop().url;
  }

}
