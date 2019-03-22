import { Component, OnInit, Input } from '@angular/core';
import { Media, MediaTipo } from 'src/app/core/models';
import { YoutubeService } from '../../services';

@Component({
  selector: 'app-media-card',
  template: `
  <span [ngSwitch]="media.tipo">
    <div *ngSwitchCase="types.MP3"><app-mp3 [media]="media"></app-mp3></div>
    <div *ngSwitchCase="types.YOUTUBE"><app-youtube [media]="media"></app-youtube></div>
</span>`,
  styleUrls: ['./media.card.component.scss']
})
export class MediaCardComponent implements OnInit {
  @Input('media') media: Media;
  types = MediaTipo;
  videoId: string;
  constructor(public youtube: YoutubeService) { }

  ngOnInit() {
    console.log(this.media);
  }

}
