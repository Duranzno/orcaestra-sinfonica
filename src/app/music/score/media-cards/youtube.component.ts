import { Component, OnInit, Input } from '@angular/core';
import { Media } from 'src/app/core/models';
import { YoutubeService } from 'src/app/music/services';

@Component({
  selector: 'app-youtube',
  template: `
  <mat-card class="media-card">
  <mat-card-header>
    <mat-card-title>Video de Youtube</mat-card-title>
  </mat-card-header>
  <mat-card-content fxLayout="row">
    <youtube-player fxFill [videoId]="this.youtube.id" height="300" width="600" (ready)="this.youtube.savePlayer($event)"
      (change)="this.youtube.onStateChange($event)">
    </youtube-player>
  </mat-card-content>
  <mat-card-actions>
    <button mat-icon-button (click)="this.youtube.playVideo()">
      <mat-icon>play_arrow</mat-icon>
    </button>
    <button mat-icon-button (click)="this.youtube.pauseVideo()">
      <mat-icon>pause</mat-icon>
    </button>
  </mat-card-actions>
</mat-card>
  `,
  styleUrls: ['./media.card.component.scss']
})
export class YoutubeComponent implements OnInit {
  @Input('media') media: Media;
  vUrls: string[];
  vId: string;
  constructor(public youtube: YoutubeService) { }

  ngOnInit() {
    this.vUrls = this.media.origenArray.map(o => o.url);
    this.vId = this.vUrls.pop();
    this.youtube.setup(this.vId);
  }


}
