import { Injectable } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Injectable({
  providedIn: 'root'
})
export class WavesurferService {
  public wavesurfer;
  constructor() { }

  setup() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });
  }

  play() {
    this.wavesurfer.load('/assets/9th/beethoven.mp3');
    this.wavesurfer.on('ready', () => {
      this.wavesurfer.play();
    });
  }
}
