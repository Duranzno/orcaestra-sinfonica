import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WavesurferService, YoutubeService, OsmdService } from '../core/services/';
import { Score, MediaType } from '../core/models';
import { iScore } from '../core/mock';

class MediaBuffer {
  constructor(
    public avatar: string = '',
    public pdf: string = '',
    public img: string = '',
    public mxml: string = '',
    public mp3: string = '',
    public youtube: string = '') { }
}

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: []
})
export class SheetComponent implements OnInit {
  mockData: Score = new Score(iScore);
  media: MediaBuffer = new MediaBuffer();
  constructor(
    // private ws: WavesurferService,
    // public youtube: YoutubeService,
    // private osmd: OsmdService
  ) {
  }

  ngOnInit() {
    console.log(this.media);

    // this.media.avatar = this.mockData.assets(MediaType.AVATAR).url;
    // this.media.pdf = this.mockData.assets(MediaType.PDF).url;
    // this.media.img = this.mockData.assets(MediaType.IMG).url;
    // this.media.mxml = this.mockData.otherUrl(MediaType.MXML).url;
    // this.media.mp3 = this.mockData.assets(MediaType.MP3).url;
    // this.media.youtube = this.mockData.otherUrl(MediaType.YOUTUBE).url;
    // console.log(this.media);

    // this.osmd.setup(this.media.mxml);
    // this.ws.setup(this.media.mp3);
    // console.log(this.youtube.urlParser(this.media.youtube));

  }

}
