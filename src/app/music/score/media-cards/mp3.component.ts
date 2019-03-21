import { Component, OnInit, Input } from '@angular/core';
import { Media } from 'src/app/core/models';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-mp3',
  template: `
  <mat-card class="media-card">
  <mat-card-header>
    <mat-card-title>Audio MP3</mat-card-title>
  </mat-card-header>
  <mat-card-content fxLayout="row">
    <div style="width: 100%;" id="w"></div>
  </mat-card-content>
  <mat-card-actions>
  <button mat-icon-button (click)="this.wave.playPause()">
    <mat-icon>{{!isPlaying?"play_arrow":"pause"}}</mat-icon>
  </button>
  <button mat-icon-button (click)="this.wave.toggleMute()">
    <mat-icon>{{isMute?"volume_off":"volume_up"}}</mat-icon>
    </button>
    <a [href]="url"  target="_blank" download #anchor></a>
    <button mat-icon-button (click)="anchor.click()">
    <mat-icon>cloud_download</mat-icon>
  </button>

  </mat-card-actions>
  </mat-card>
  `,
  styleUrls: ['./media.card.component.scss']
})
export class Mp3Component implements OnInit {
  @Input('media') media: Media;
  url: string = 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3';
  isPlaying: boolean = false;
  isMute: boolean = false;
  wave: any;
  constructor(
  ) { }

  ngOnInit() {
    this.url = this.media.origenArray.pop().url;
    this.wave = WaveSurfer.create({
      container: '#w',
      waveColor: 'violet',
      cursorColor: '#111',
      responsive: true,
      height: 200,
      progressColor: 'purple'
    });
    this.wave.load(this.url);
    this.wave.on('ready', () => {
      console.log('ready');
      // this.wave.play();
    });
    this.wave.on('error', (err) => { console.error(err); });
    this.wave.on('mute', (isMute) => { this.isMute = isMute; });
    this.wave.on('waveform-ready', () => { console.log('waveform-ready'); });
    this.wave.on('play', () => { console.log('play'); this.isPlaying = true; });
    this.wave.on('pause', () => { console.log('pause'); this.isPlaying = false; });
    this.wave.on('finish', () => { console.log('finish'); });
    this.wave.on('interaction', () => { console.log('interaction'); });
    // this.wave.on('loading', (percentage) => { console.log(`percentage ${percentage}`); });
  }

}
