import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { Media } from 'src/app/core/models';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of, from, Subscription } from 'rxjs';

@Component({
  selector: 'app-mxml',
  template: `
  <mat-card class="media-card">
  <mat-card-header>
    <mat-card-title>Partitura MusicXML</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <div id="osmd"></div>
  </mat-card-content>
  <mat-card-actions>
  <!--<button mat-icon-button (click)="this.wave.playPause()">
    <mat-icon>{{!isPlaying?"play_arrow":"pause"}}</mat-icon>
  </button>
  <button mat-icon-button (click)="this.wave.toggleMute()">
    <mat-icon>{{isMute?"volume_off":"volume_up"}}</mat-icon>
    </button>
    <a [href]="url"  target="_blank" download #anchor></a>
    <button mat-icon-button (click)="anchor.click()">
    <mat-icon>cloud_download</mat-icon>
  </button>-->
  </mat-card-actions>
  </mat-card>
  `,
  styleUrls: ['./media.card.component.scss']
})
export class MxmlComponent implements OnInit, OnDestroy {
  @Input('media') media: Media;
  sub$ = new Subscription();
  url: string = 'https://firebasestorage.googleapis.com/v0/b/orcaestra-sinfonica.appspot.com/o/BeetAnGeSample.musicxml?alt=media&token=e97d52c9-2d11-45e7-8ec2-178e87731023';
  private osmd: OpenSheetMusicDisplay;
  constructor() { }

  ngOnInit() {
    console.log(this.media);
    this.url = this.media.originArray.pop().url;
    const container = document.getElementById('osmd');
    this.osmd = new OpenSheetMusicDisplay(container, { autoResize: true });
    this.sub$ = from(this.osmd.load(this.url))
      .subscribe(v => {
        this.osmd.render();
        console.log(v);
      });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}
