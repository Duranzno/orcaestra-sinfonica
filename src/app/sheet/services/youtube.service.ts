import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  player: YT.Player;
  id = 't3217H8JppI';
  constructor() {

  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }
  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }
}
