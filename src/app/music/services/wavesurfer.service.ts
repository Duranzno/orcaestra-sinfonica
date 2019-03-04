import { Injectable } from '@angular/core';
// import WaveSurfer from 'wavesurfer.js';

@Injectable({
  providedIn: 'root'
})
export class WavesurferService {
  // public wavesurfer;
  constructor() { }

  setup(url) {
    // this.wavesurfer = WaveSurfer.create({
    //   container: '#waveform',
    //   waveColor: 'violet',
    //   progressColor: 'purple'
    // });
    // this.wavesurfer.load(url);
  }

  play() {
    // this.wavesurfer.on('ready', () => {
    //   this.wavesurfer.play();
    // });
  }
}
