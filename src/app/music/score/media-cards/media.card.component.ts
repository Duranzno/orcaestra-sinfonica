import { Component, OnInit, Input } from '@angular/core';
import { Media, MediaType } from 'src/app/core/models';
import { YoutubeService } from '../../services';

@Component({
  selector: 'app-media-card',
  template: `
  <span [ngSwitch]="media.type">
    <div *ngSwitchCase="types.MP3"><app-mp3 [media]="media"></app-mp3></div>
    <!--<div *ngSwitchCase="types.MIDI"><app-midi [media]="media"></app-midi></div>-->
    <div *ngSwitchCase="types.PDF"><app-pdf [media]="media"></app-pdf></div>
    <div *ngSwitchCase="types.YOUTUBE"><app-youtube [media]="media"></app-youtube></div>
</span>`,
  styleUrls: ['./media.card.component.scss']
})
export class MediaCardComponent implements OnInit {
  @Input('media') media: Media;
  types = MediaType;
  videoId: string;
  constructor(public youtube: YoutubeService) { }

  ngOnInit() {
    console.log(this.media);
  }

}
